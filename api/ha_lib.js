// ha_lib.js - Home Assistant helper library

/**
 * Log action messages into the #action-log element
 * @param {string} msg
 */
function logAction(msg) {
  const logDiv = document.getElementById('action-log');
  if (!logDiv) return;
  const entry = document.createElement('div');
  entry.textContent = msg;
  logDiv.appendChild(entry);
  logDiv.scrollTop = logDiv.scrollHeight;
}

/**
 * Test authentication by fetching Home Assistant config
 */
async function testAuth() {
  logAction('Testing authentication with token');
  try {
    const res = await fetch(`${HA_URL}/api/config`, {
      headers: { 'Authorization': `Bearer ${TOKEN}` },
      mode: 'cors'
    });
    if (res.ok) {
      const { version } = await res.json();
      logAction(`Authenticated: HA version ${version}`);
    } else {
      logAction(`Auth failed: ${res.status} ${res.statusText}`);
    }
  } catch (e) {
    logAction(`Auth error: ${e.message}`);
  }
}

/**
 * Fetch the state of an entity
 * @param {string} entity_id
 * @returns {Promise<string>}
 */
async function fetchState(entity_id) {
  logAction(`Fetching state for ${entity_id}`);
  const res = await fetch(`${HA_URL}/api/states/${entity_id}`, {
    mode: 'cors',
    headers: { 'Authorization': `Bearer ${TOKEN}` }
  });
  if (!res.ok) {
    logAction(`Fetch state error: ${res.status} ${res.statusText}`);
    throw new Error(res.statusText);
  }
  const data = await res.json();
  logAction(`State for ${entity_id}: ${data.state}`);
  return data.state;
}

/**
 * Call a Home Assistant service
 * @param {string} domain
 * @param {string} service
 * @param {object} data
 */
async function callService(domain, service, data) {
  logAction(`Calling service ${domain}.${service}`);
  const res = await fetch(`${HA_URL}/api/services/${domain}/${service}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    logAction(`Service error: ${res.status} ${res.statusText}`);
    throw new Error(res.statusText);
  }
  logAction(`Service ${domain}.${service} executed`);
}

/**
 * Initialize toggle buttons matching selector
 * @param {string} selector - CSS selector for toggle buttons
 */
function initToggleButtons(selector) {
  document.querySelectorAll(selector).forEach(btn => {
    refreshButton(btn);
    btn.addEventListener('click', async () => {
      btn.disabled = true;
      const entity = btn.dataset.entity;
      logAction(`Toggling ${entity}`);
      try {
        await callService(entity.split('.')[0], 'toggle', { entity_id: entity });
        await refreshButton(btn);
      } catch (e) {
        logAction(`Toggle error ${entity}: ${e.message}`);
      }
      btn.disabled = false;
    });
  });
}

/**
 * Refresh the visual state of a button
 * @param {HTMLElement} btn
 */
async function refreshButton(btn) {
  try {
    const state = await fetchState(btn.dataset.entity);
    btn.classList.toggle('on', state === 'on');
    btn.classList.toggle('off', state !== 'on');
  } catch (e) {
    logAction(`Refresh error: ${e.message}`);
  }
}

/**
 * Enable periodic auto-refresh of buttons
 * @param {string} selector - CSS selector for buttons
 * @param {number} interval_ms
 * @returns {number} intervalId
 */
function enableAutoRefresh(selector, interval_ms = 30000) {
  logAction(`Auto-refresh every ${interval_ms/1000}s`);
  return setInterval(() => document.querySelectorAll(selector).forEach(refreshButton), interval_ms);
}

/**
 * Display an entity state in a container
 * @param {string} entity_id
 * @param {string} containerSelector
 */
async function displayState(entity_id, containerSelector) {
  logAction(`Displaying state for ${entity_id}`);
  try {
    const state = await fetchState(entity_id);
    const el = document.querySelector(containerSelector);
    if (el) el.textContent = state;
  } catch (e) {
    logAction(`DisplayState error: ${e.message}`);
  }
}

// Expose API on window.HA namespace
window.HA = {
  testAuth,
  fetchState,
  callService,
  initToggleButtons,
  enableAutoRefresh,
  displayState,
  refreshButton
};
