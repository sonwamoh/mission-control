import React, { useState } from "react";
import axios from "axios";

const CommandForm = () => {
  const [speed, setSpeed] = useState("");
  const [direction, setDirection] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const command = { speed, direction };
      const res = await axios.post("http://localhost:5000/commands", command);
      setMessage(res.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Error sending command");
    }
  };

  return (
    <div>
      <h2>Control Rover</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Speed:</label>
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Direction:</label>
          <input
            type="text"
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Command</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CommandForm;
