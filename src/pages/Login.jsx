import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [errorMsg, setErrorMsg] = useState("");

const navigate = useNavigate();
const submitForm = async (event) => {
  event.preventDefault();

  const userDetails = {
    email,
    password,
  };

  const response = await fetch(
    "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    }
  );

  const data = await response.json();

  if (response.ok) {
    Cookies.set("jwt_token", data.data.token);

    navigate("/");
  } else {
    setErrorMsg(data.message);
  }
};

  return (
    <div className="login-container">
      <div className="login-card">

        <h1 className="brand">
          Go Business
        </h1>

        <p className="tagline">
          Sign in to open your referral dashboard.
        </p>

        <form onSubmit={submitForm}>

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
         {errorMsg && (
  <p className="error-msg">
    {errorMsg}
  </p>
)}
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