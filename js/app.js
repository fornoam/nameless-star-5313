(function () {
  'use strict';

  var currentCallSid = null;
  var pollInterval = null;
  var POLL_MS = 2500;

  var TERMINAL_STATUSES = ['completed', 'failed', 'no-answer', 'busy', 'canceled'];

  // =================== Form Submission ===================

  document.getElementById('scheduler-form').addEventListener('submit', function (e) {
    e.preventDefault();

    var payload = {
      customerName: document.getElementById('customerName').value.trim(),
      hairdresserPhone: document.getElementById('hairdresserPhone').value.trim(),
      hairdresserName: document.getElementById('hairdresserName').value.trim(),
      service: document.getElementById('service').value,
      preferredDate: document.getElementById('preferredDate').value.trim(),
      preferredTime: document.getElementById('preferredTime').value.trim(),
    };

    if (!payload.customerName || !payload.hairdresserPhone || !payload.service) {
      showFormError('Please fill in your name, the salon phone number, and service type.');
      return;
    }

    clearFormError();
    initiateCall(payload);
  });

  // =================== Call Initiation ===================

  function initiateCall(payload) {
    setFormLoading(true);

    fetch('/api/call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        return res.json().then(function (data) {
          return { ok: res.ok, data: data };
        });
      })
      .then(function (result) {
        setFormLoading(false);
        if (!result.ok) {
          showFormError(result.data.error || 'Failed to start call. Check your server configuration.');
          return;
        }
        currentCallSid = result.data.callSid;
        showStatusPanel();
        startPolling();
      })
      .catch(function (err) {
        setFormLoading(false);
        showFormError('Network error: ' + err.message);
      });
  }

  // =================== Polling ===================

  function startPolling() {
    stopPolling();
    pollInterval = setInterval(pollStatus, POLL_MS);
    pollStatus(); // immediate first check
  }

  function stopPolling() {
    if (pollInterval) {
      clearInterval(pollInterval);
      pollInterval = null;
    }
  }

  function pollStatus() {
    if (!currentCallSid) return;

    fetch('/api/call/' + currentCallSid)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        updateStatusPanel(data);
        if (TERMINAL_STATUSES.indexOf(data.status) !== -1) {
          stopPolling();
        }
      })
      .catch(function (err) {
        console.error('Polling error:', err);
      });
  }

  // =================== UI Updates ===================

  function showStatusPanel() {
    document.getElementById('form-section').style.display = 'none';
    var panel = document.getElementById('status-panel');
    panel.style.display = 'block';
    updateStatusBadge('calling', 'Dialing salon...');
  }

  function updateStatusPanel(data) {
    var status = data.status;
    var transcript = data.transcript || [];
    var result = data.appointmentResult;

    // Update status badge
    var label = statusLabel(status, data.twilioStatus);
    updateStatusBadge(status, label);

    // Update transcript
    renderTranscript(transcript);

    // Show result card when done
    if (TERMINAL_STATUSES.indexOf(status) !== -1 && result) {
      renderResult(result, status);
    }
  }

  function statusLabel(status, twilioStatus) {
    var map = {
      calling: 'Dialing salon...',
      'in-progress': 'Call in progress',
      completed: 'Call completed',
      failed: 'Call failed',
      'no-answer': 'No answer',
      busy: 'Line busy',
      canceled: 'Call canceled',
    };
    return map[status] || (twilioStatus ? 'Status: ' + twilioStatus : 'Connecting...');
  }

  function updateStatusBadge(status, label) {
    var badge = document.getElementById('status-badge');
    var dot = document.getElementById('status-dot');
    var text = document.getElementById('status-text');

    // Remove all status classes
    badge.className = 'status-badge status-' + status;
    var isActive = status === 'calling' || status === 'in-progress';
    dot.className = 'status-dot' + (isActive ? ' pulse' : '');
    text.textContent = label;
  }

  function renderTranscript(transcript) {
    var container = document.getElementById('transcript');
    if (!transcript || transcript.length === 0) {
      container.innerHTML = '<p class="transcript-empty">Waiting for call to connect...</p>';
      return;
    }

    var html = '';
    for (var i = 0; i < transcript.length; i++) {
      var turn = transcript[i];
      var isAgent = turn.role === 'assistant';
      html +=
        '<div class="transcript-turn ' + (isAgent ? 'turn-agent' : 'turn-salon') + '">' +
        '<span class="turn-label">' + (isAgent ? 'AI Agent' : 'Salon') + '</span>' +
        '<span class="turn-text">' + escapeHtml(turn.content) + '</span>' +
        '</div>';
    }
    container.innerHTML = html;

    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
  }

  function renderResult(result, status) {
    var resultCard = document.getElementById('result-card');
    var html = '';

    if (result.confirmed) {
      html =
        '<div class="result-confirmed">' +
        '<div class="result-icon">&#10003;</div>' +
        '<h3>Appointment Confirmed!</h3>' +
        (result.date ? '<p><strong>Date:</strong> ' + escapeHtml(result.date) + '</p>' : '') +
        (result.time ? '<p><strong>Time:</strong> ' + escapeHtml(result.time) + '</p>' : '') +
        (result.service ? '<p><strong>Service:</strong> ' + escapeHtml(result.service) + '</p>' : '') +
        (result.notes ? '<p><strong>Notes:</strong> ' + escapeHtml(result.notes) + '</p>' : '') +
        '</div>';
    } else {
      var reason = result.reason || statusLabel(status);
      html =
        '<div class="result-failed">' +
        '<div class="result-icon">&#10007;</div>' +
        '<h3>Appointment Not Scheduled</h3>' +
        '<p>' + escapeHtml(reason) + '</p>' +
        '</div>';
    }

    // New call button
    html += '<button class="button" id="new-call-btn">Schedule Another Appointment</button>';

    resultCard.innerHTML = html;
    resultCard.style.display = 'block';

    document.getElementById('new-call-btn').addEventListener('click', resetApp);
  }

  // =================== Helpers ===================

  function resetApp() {
    currentCallSid = null;
    stopPolling();

    document.getElementById('status-panel').style.display = 'none';
    document.getElementById('result-card').style.display = 'none';
    document.getElementById('result-card').innerHTML = '';
    document.getElementById('transcript').innerHTML = '';
    document.getElementById('form-section').style.display = 'block';
    document.getElementById('scheduler-form').reset();
  }

  function setFormLoading(loading) {
    var btn = document.getElementById('call-btn');
    btn.disabled = loading;
    btn.textContent = loading ? 'Initiating Call...' : 'Call & Schedule Appointment';
  }

  function showFormError(msg) {
    var el = document.getElementById('form-error');
    el.textContent = msg;
    el.style.display = 'block';
  }

  function clearFormError() {
    var el = document.getElementById('form-error');
    el.textContent = '';
    el.style.display = 'none';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
