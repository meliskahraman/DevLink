import { useEffect, useState } from "react";
import axios from "axios";

function TestConnection() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        console.error(error);
        setMessage("Backend connection failed");
      });
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>DevLink Frontend</h1>
      <p>{message}</p>
    </div>
  );
}

export default TestConnection;