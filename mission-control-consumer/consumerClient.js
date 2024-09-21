const axios = require('axios');

// Server endpoints
const SERVER_URL = 'http://localhost:5000';
const COMMANDS_ENDPOINT = `${SERVER_URL}/commands`;
const STATUS_ENDPOINT = `${SERVER_URL}/status`;

// Time interval to fetch commands and send heartbeat (in ms)
const FETCH_INTERVAL = 5000; // 5 seconds

// Function to fetch the latest commands
const fetchCommands = async () => {
  try {
    const response = await axios.get(COMMANDS_ENDPOINT);
    if (response.status === 200) {
      console.log('Received Command:', response.data);
    } else {
      console.log('No new commands.');
    }
  } catch (error) {
    if (error.response && error.response.status === 204) {
      console.log('No new commands.');
    } else {
      console.error('Error fetching commands:', error.message);
    }
  }
};

// Function to send a heartbeat signal to the server
const sendHeartbeat = async () => {
  try {
    const response = await axios.post(STATUS_ENDPOINT);
    if (response.status === 200) {
      console.log('Heartbeat sent successfully');
    }
  } catch (error) {
    console.error('Error sending heartbeat:', error.message);
  }
};

// Set interval to fetch commands and send heartbeat periodically
setInterval(() => {
  fetchCommands();
  sendHeartbeat();
}, FETCH_INTERVAL);
