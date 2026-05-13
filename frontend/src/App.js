import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  const [mode, setMode] = useState("login");

  return (
    <div style={{ padding: "40px" }}>
      <h1>DevLink</h1>

      <button onClick={() => setMode("login")}>Login</button>
      <button onClick={() => setMode("register")} style={{ marginLeft: "10px" }}>
        Register
      </button>

      <hr />

      {mode === "login" ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}

export default App;