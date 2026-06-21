import { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-container">
      <div className="login-card">

        <h1 className="brand">
          Go Business
        </h1>

        <p className="tagline">
          Sign in to open your referral dashboard.
        </p>

        <form>

          <div className="input-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button
            className="login-btn"
            type="submit"
          >
            Sign in
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;