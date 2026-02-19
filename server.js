require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const path = require('path');
const { getClaudeResponse, createSystemPrompt } = require('./services/claude');

const app = express();

// Parse URL-encoded bodies (Twilio sends these) and JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// In-memory session store keyed by Twilio CallSid
const callSessions = new Map();

// Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// =================== API Routes ===================

// POST /api/call - Initiate an outbound call to the hairdresser
app.post('/api/call', async (req, res) => {
  try {
    const {
      hairdresserPhone,
      hairdresserName,
      customerName,
      service,
      preferredDate,
      preferredTime,
    } = req.body;

    if (!hairdresserPhone || !customerName || !service) {
      return res.status(400).json({ error: 'Missing required fields: hairdresserPhone, customerName, service' });
    }

    const baseUrl = process.env.BASE_URL;
    if (!baseUrl) {
      return res.status(500).json({
        error: 'BASE_URL is not configured. Set it in your .env file to your public server URL (e.g. from ngrok).',
      });
    }

    const call = await twilioClient.calls.create({
      to: hairdresserPhone,
      from: process.env.TWILIO_PHONE_NUMBER,
      url: `${baseUrl}/voice/start`,
      statusCallback: `${baseUrl}/voice/status`,
      statusCallbackMethod: 'POST',
      statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
    });

    // Build the initial greeting so we can store it and reference it later
    const initialGreeting = buildInitialGreeting({
      customerName,
      hairdresserName: hairdresserName || 'the salon',
      service,
      preferredDate,
      preferredTime,
    });

    callSessions.set(call.sid, {
      callSid: call.sid,
      userPreferences: {
        customerName,
        hairdresserName: hairdresserName || 'the salon',
        service,
        preferredDate: preferredDate || '',
        preferredTime: preferredTime || '',
        hairdresserPhone,
      },
      initialGreeting,
      // claudeMessages: alternating user/assistant for the Claude API (starts after the opening greeting)
      claudeMessages: [],
      // transcript: full record of everything said, for display
      transcript: [{ role: 'assistant', content: initialGreeting }],
      status: 'calling',
      twilioStatus: 'queued',
      appointmentResult: null,
      createdAt: Date.now(),
    });

    res.json({ callSid: call.sid, status: 'calling' });
  } catch (err) {
    console.error('Error initiating call:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/call/:callSid - Poll for call status + transcript
app.get('/api/call/:callSid', (req, res) => {
  const session = callSessions.get(req.params.callSid);
  if (!session) {
    return res.status(404).json({ error: 'Call not found' });
  }
  res.json({
    callSid: session.callSid,
    status: session.status,
    twilioStatus: session.twilioStatus,
    transcript: session.transcript,
    appointmentResult: session.appointmentResult,
  });
});

// =================== Voice Webhook Routes ===================

// POST /voice/start - Twilio calls this when the hairdresser picks up
app.post('/voice/start', (req, res) => {
  const callSid = req.body.CallSid;
  const session = callSessions.get(callSid);
  const twiml = new twilio.twiml.VoiceResponse();
  const baseUrl = process.env.BASE_URL;

  if (!session) {
    twiml.say('Sorry, an error occurred. Goodbye.');
    twiml.hangup();
    return res.type('text/xml').send(twiml.toString());
  }

  session.status = 'in-progress';

  const gather = twiml.gather({
    input: 'speech',
    action: `${baseUrl}/voice/gather`,
    method: 'POST',
    timeout: 10,
    speechTimeout: 'auto',
    language: 'en-US',
  });

  gather.say({ voice: 'alice' }, session.initialGreeting);

  // If the hairdresser doesn't say anything, prompt them once more
  twiml.redirect({ method: 'POST' }, `${baseUrl}/voice/no-input`);

  res.type('text/xml').send(twiml.toString());
});

// POST /voice/gather - Twilio calls this after the hairdresser speaks
app.post('/voice/gather', async (req, res) => {
  const callSid = req.body.CallSid;
  const speechResult = req.body.SpeechResult || '';
  const session = callSessions.get(callSid);
  const baseUrl = process.env.BASE_URL;
  const twiml = new twilio.twiml.VoiceResponse();

  if (!session) {
    twiml.say('Sorry, an error occurred. Goodbye.');
    twiml.hangup();
    return res.type('text/xml').send(twiml.toString());
  }

  console.log(`[${callSid}] Hairdresser: "${speechResult}"`);

  // Record what the hairdresser said
  session.claudeMessages.push({ role: 'user', content: speechResult });
  session.transcript.push({ role: 'user', content: speechResult });

  try {
    const systemPrompt = createSystemPrompt(session.userPreferences, session.initialGreeting);
    const { response, isComplete, appointmentResult } = await getClaudeResponse(
      systemPrompt,
      session.claudeMessages
    );

    console.log(`[${callSid}] Agent: "${response}" | complete=${isComplete}`);

    // Record Claude's response
    session.claudeMessages.push({ role: 'assistant', content: response });
    session.transcript.push({ role: 'assistant', content: response });

    if (isComplete) {
      session.status = 'completed';
      session.appointmentResult = appointmentResult;
      twiml.say({ voice: 'alice' }, response);
      twiml.pause({ length: 1 });
      twiml.hangup();
    } else {
      const gather = twiml.gather({
        input: 'speech',
        action: `${baseUrl}/voice/gather`,
        method: 'POST',
        timeout: 10,
        speechTimeout: 'auto',
        language: 'en-US',
      });
      gather.say({ voice: 'alice' }, response);
      twiml.redirect({ method: 'POST' }, `${baseUrl}/voice/no-input`);
    }
  } catch (err) {
    console.error(`[${callSid}] Claude error:`, err);
    const apology =
      'I apologize, I encountered a technical issue. I will have the customer reach out directly. Thank you and goodbye.';
    twiml.say({ voice: 'alice' }, apology);
    twiml.hangup();
    session.status = 'failed';
    session.appointmentResult = { confirmed: false, reason: 'Technical error during call' };
    session.transcript.push({ role: 'assistant', content: apology });
  }

  res.type('text/xml').send(twiml.toString());
});

// POST /voice/no-input - Called when the hairdresser doesn't respond
app.post('/voice/no-input', (req, res) => {
  const callSid = req.body.CallSid;
  const session = callSessions.get(callSid);
  const baseUrl = process.env.BASE_URL;
  const twiml = new twilio.twiml.VoiceResponse();

  const gather = twiml.gather({
    input: 'speech',
    action: `${baseUrl}/voice/gather`,
    method: 'POST',
    timeout: 10,
    speechTimeout: 'auto',
    language: 'en-US',
  });
  gather.say({ voice: 'alice' }, "I'm sorry, I didn't catch that. Are you able to help me schedule an appointment?");

  twiml.say({ voice: 'alice' }, "I didn't receive a response. I'll have the customer follow up directly. Goodbye.");
  twiml.hangup();

  if (session && session.status !== 'completed') {
    session.status = 'no-answer';
    session.appointmentResult = { confirmed: false, reason: 'No response from salon' };
  }

  res.type('text/xml').send(twiml.toString());
});

// POST /voice/status - Twilio status callback
app.post('/voice/status', (req, res) => {
  const callSid = req.body.CallSid;
  const callStatus = req.body.CallStatus;
  const session = callSessions.get(callSid);

  console.log(`[${callSid}] Twilio status: ${callStatus}`);

  if (session) {
    session.twilioStatus = callStatus;

    if (['failed', 'busy', 'no-answer', 'canceled'].includes(callStatus)) {
      if (session.status !== 'completed') {
        session.status = callStatus === 'busy' ? 'busy' : callStatus;
        if (!session.appointmentResult) {
          session.appointmentResult = { confirmed: false, reason: `Call ${callStatus}` };
        }
      }
    }
  }

  res.sendStatus(200);
});

// =================== Helpers ===================

function buildInitialGreeting({ customerName, hairdresserName, service, preferredDate, preferredTime }) {
  let greeting = `Hello! I'm calling on behalf of ${customerName} to schedule a ${service} appointment.`;

  if (preferredDate && preferredTime) {
    greeting += ` They were hoping to come in on ${preferredDate} around ${preferredTime}.`;
  } else if (preferredDate) {
    greeting += ` They were hoping to come in on ${preferredDate}.`;
  } else if (preferredTime) {
    greeting += ` They were hoping to come in around ${preferredTime}.`;
  } else {
    greeting += ` They are flexible on timing and are looking for the next available slot.`;
  }

  greeting += ` Is that something you can help me with?`;
  return greeting;
}

// =================== Start Server ===================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\nVoice Appointment Scheduler running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
  if (!process.env.BASE_URL) {
    console.warn('\nWARNING: BASE_URL is not set. Twilio webhooks will not work.');
    console.warn('Run ngrok and set BASE_URL in your .env file.\n');
  } else {
    console.log(`BASE_URL: ${process.env.BASE_URL}\n`);
  }
});
