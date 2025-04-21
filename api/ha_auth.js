// ha_auth.js - Home Assistant authentication parameters

// Home Assistant URL and Long-Lived Access Token
const HA_URL = 'http://YOUR_HA_IP:8123';
const TOKEN = 'YOUR_LONG_LIVED_ACCESS_TOKEN';

// Expose them globally so ha_lib.js can use
window.HA_URL = HA_URL;
window.TOKEN  = TOKEN;