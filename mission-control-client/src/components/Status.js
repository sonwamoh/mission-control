import React, { useEffect, useState } from "react";
import axios from "axios";

const Status = () => {
  const [isConnected, setIsConnected] = useState(false);

  const fetchStatus = async () => {
    try {
      const res = await axios.get("http://localhost:5000/status");
      setIsConnected(res.data.isConnected);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchStatus, 5000); // Fetch every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Consumer Status</h2>
      <p>
        {isConnected ? "Consumer is connected" : "Consumer is disconnected"}
      </p>
    </div>
  );
};

export default Status;
