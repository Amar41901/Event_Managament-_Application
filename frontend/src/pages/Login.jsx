import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      const details = data.data.user;
      console.log(details)
      const receivedToken = data.data.token;
      console.log(receivedToken);

      const name1 = details.username;
      const img1 = details.image;
      const email1 = details.email

      setToken(receivedToken);
      localStorage.setItem('token', receivedToken);
      localStorage.setItem('username',name1 );
      localStorage.setItem('image',img1 );
      localStorage.setItem('email',email1 );
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="body">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h2 className="heading">Login</h2>
          <div className="content">
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {err && <p className="user-exists">{err}</p>}
          <div className="button">
            <button type="submit">Submit</button>
          </div>
          <span className="msg">
            <p>
              Don't Have an account? <Link to="/register">Create one</Link>
            </p>
          </span>
        </form>
      </div>
    </div>
  );
}

export default App;
