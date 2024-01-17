import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Registration() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (setState) => (event) => {
    setState(event.target.value);
  };
  const checkEmailExists = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/auth/check/${email}`);
      return response.data.exists;
    } catch (err) {
      return false;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const emailExists = await checkEmailExists();
    if (emailExists) {
      setError("Email already registered.");
    } else {
      try {
        setError(null); 
        const response = await axios.post("http://localhost:8080/api/auth/register", {
          username: userName,
          email: email,
          password: password,
          image: "profile-1692268399090.png"
        });
        if (response.status === 200) {
          setMessage("OTP sent to your email. Please check and enter below.");
        }
      } catch (err) {
        setError("An error occurred during registration.");
      }
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/verify-otp", {
        username: userName,
        email: email,
        password: password,
        otp: otp,
        image: "profile-1692268399090.png"
      });
      if (response.status === 200) {
        navigate('/login');
      }
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="body">
      <div className="login-form">
        <form onSubmit={message ? handleVerifyOTP : handleRegister}>
          <h2 className="heading">Registration</h2>
          <div className="content">
            {message ? (
              <div className="input-box">
                <input
                  type="text"
                  placeholder="OTP"
                  value={otp}
                  onChange={handleChange(setOtp)}
                  required
                />
              </div>
            ) : (
              <>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="User Name"
                    required
                    value={userName}
                    onChange={handleChange(setUserName)}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={handleChange(setEmail)}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Create Password"
                    value={password}
                    onChange={handleChange(setPassword)}
                  />
                </div>
              </>
            )}
          </div>
          {error && <p className="user-exists">{error}</p>}
          <div className="button">
            <button type="submit">
              {message ? "Verify OTP and Register" : "Submit"}
            </button>
          </div>
            <span className="msg">
              <p>
                Already Have an account? <Link to="/login">Login Here</Link>
              </p>
            </span>
        </form>
      </div>
    </div>
  );
}

export default Registration;
