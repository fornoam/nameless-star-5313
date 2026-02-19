const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Build the system prompt for the voice agent.
 * The initialGreeting is what was already said when the hairdresser picked up,
 * so Claude continues from there.
 */
function createSystemPrompt(userPreferences, initialGreeting) {
  const { customerName, hairdresserName, service, preferredDate, preferredTime } = userPreferences;

  return `You are a polite, efficient AI phone assistant calling a hair salon on behalf of ${customerName} to schedule a ${service} appointment.

You have already started the call with this opening line:
"${initialGreeting}"

Now you must continue the conversation based on the salon's responses.

CUSTOMER DETAILS:
- Customer name: ${customerName}
- Service requested: ${service}
- Preferred date: ${preferredDate || 'flexible'}
- Preferred time: ${preferredTime || 'flexible'}
- Salon/stylist: ${hairdresserName}

CONVERSATION RULES:
- Keep each response to 1-3 natural spoken sentences — this is a phone call, not an email
- Be polite, warm, and professional
- If the preferred time is unavailable, ask what the nearest available slots are and pick the best one
- Once an appointment is confirmed, repeat the key details (date, time, service) and say goodbye
- If the salon cannot accommodate at all, thank them graciously and end the call
- Do NOT reveal you are an AI unless directly and sincerely asked
- Stay focused on scheduling — do not go off-topic

ENDING THE CALL:
When the appointment is either confirmed or it's clear one cannot be made, end your response with a structured marker on a new line (the marker will be stripped before being spoken):

If confirmed:
APPOINTMENT_CONFIRMED: {"date": "<date>", "time": "<time>", "service": "<service>", "notes": "<any extra info like stylist name>"}

If not confirmed:
APPOINTMENT_FAILED: {"reason": "<brief reason e.g. fully booked, wrong service, etc.>"}

Example of a confirmed ending:
"Perfect, we have confirmed a ${service} for ${customerName} on Tuesday the 15th at 2 PM. We'll see you then — have a wonderful day! Goodbye!"
APPOINTMENT_CONFIRMED: {"date": "Tuesday the 15th", "time": "2 PM", "service": "${service}", "notes": ""}

Example of a failed ending:
"I understand, thank you so much for checking. I'll let ${customerName} know and they will reach out directly. Have a great day! Goodbye!"
APPOINTMENT_FAILED: {"reason": "No availability on the requested date"}`;
}

/**
 * Send the conversation to Claude and parse its response.
 * Returns { response, isComplete, appointmentResult }
 */
async function getClaudeResponse(systemPrompt, messages) {
  const message = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 400,
    system: systemPrompt,
    messages,
  });

  const fullText = message.content[0].text.trim();

  // Check for completion markers
  const confirmedMatch = fullText.match(/APPOINTMENT_CONFIRMED:\s*(\{[\s\S]*?\})/);
  const failedMatch = fullText.match(/APPOINTMENT_FAILED:\s*(\{[\s\S]*?\})/);

  let isComplete = false;
  let appointmentResult = null;
  let spokenResponse = fullText;

  if (confirmedMatch) {
    isComplete = true;
    try {
      const data = JSON.parse(confirmedMatch[1]);
      appointmentResult = { confirmed: true, ...data };
    } catch {
      appointmentResult = { confirmed: true, raw: confirmedMatch[1] };
    }
    // Strip the marker from what gets spoken
    spokenResponse = fullText.replace(/\nAPPOINTMENT_CONFIRMED:[\s\S]*$/, '').trim();
  } else if (failedMatch) {
    isComplete = true;
    try {
      const data = JSON.parse(failedMatch[1]);
      appointmentResult = { confirmed: false, ...data };
    } catch {
      appointmentResult = { confirmed: false, raw: failedMatch[1] };
    }
    spokenResponse = fullText.replace(/\nAPPOINTMENT_FAILED:[\s\S]*$/, '').trim();
  }

  return { response: spokenResponse, isComplete, appointmentResult };
}

module.exports = { getClaudeResponse, createSystemPrompt };
