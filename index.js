//import
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// In-memory storage
let latestCommand = null;
let consumerLastHeartbeat = null;

// Configurable timeout margin (in milliseconds)
const TIMEOUT_MARGIN = 5000; // 5 seconds

// POST /commands - Receive commands from Control Client
app.post("/commands", (req, res) => {
  latestCommand = req.body;
  console.log("Received command:", latestCommand);
  res.status(200).json({ message: "Command received" });
});

// GET /commands - Consumer Client fetches the latest command
app.get("/commands", (req, res) => {
  if (latestCommand) {
    res.status(200).json(latestCommand);
    // Optionally, clear the command after sending
    latestCommand = null;
  } else {
    res.status(204).send(); // No Content
  }
});

// POST /status - Consumer Client sends heartbeat
app.post("/status", (req, res) => {
  consumerLastHeartbeat = Date.now();
  res.status(200).json({ message: "Status updated" });
});

// GET /status - Control Client checks Consumer Client connection
app.get("/status", (req, res) => {
  const isConnected =
    consumerLastHeartbeat &&
    Date.now() - consumerLastHeartbeat < TIMEOUT_MARGIN;
  res.status(200).json({ isConnected });
});

// Export the app for testing
module.exports = app;

// Start the server if this file is run directly
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`RESTful Server is running on port ${PORT}`);
  });
}
