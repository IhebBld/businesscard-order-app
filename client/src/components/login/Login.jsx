import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const Login = () => {
  const [action, setAction] = useState("Login");
  const [nameReg, setNameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [emailLog, setEmailLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const register = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/register", {
        username: nameReg,
        useremail: emailReg,
        password: passwordReg,
        role: "user",
      })
      .then((response) => {
        setAction("Login");
        setLoginStatus("Registration successful! Please login.");
      });
  };

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", {
        useremail: emailLog,
        password: passwordLog,
      })
      .then((response) => {
        if (response.data.message) {
          setLoginError("Username/password wrong combination");
        } else {
          setLoginStatus(response.data[0].username);
          navigate("/");
        }
      });
  };

  useEffect(() => {
    axios.get("http://localhost:5000/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

  return (
    <div id="login">
      <div className="login_header">
        <h2 className="text">{action}</h2>
        <div className="underline"></div>
      </div>

      {action === "Sign Up" ? (
        <form onSubmit={register}>
          <div className="inputs">
            <div className="input">
              <img src="/img/login/person.png" alt="" />
              <input
                id="namereg"
                type="text"
                placeholder="name"
                onChange={(e) => {
                  setNameReg(e.target.value);
                }}
                required
              />
            </div>
            <div className="input">
              <img src="/img/login/email.png" alt="" />
              <input
                id="emailreg"
                type="email"
                placeholder="email"
                onChange={(e) => {
                  setEmailReg(e.target.value);
                }}
                required
              />
            </div>
            <div className="input">
              <img src="/img/login/password.png" alt="" />
              <input
                id="passwordreg"
                type="password"
                placeholder="password"
                onChange={(e) => {
                  setPasswordReg(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="forgot-password">
            Already have an account?
            <span onClick={() => setAction("Login")}>Log In</span>
          </div>
          <div className="submit-container">
            <button
              className="btn btn-custom btn-lg page-scroll"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={login}>
          <div className="inputs">
            <div className="input">
              <img src="/img/login/email.png" alt="" />
              <input
                id="emaillog"
                type="email"
                placeholder="email"
                onChange={(e) => {
                  setEmailLog(e.target.value);
                }}
                required
              />
            </div>
            <div className="input">
              <img src="/img/login/password.png" alt="" />
              <input
                id="passwordlog"
                type="password"
                placeholder="password"
                onChange={(e) => {
                  setPasswordLog(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="forgot-password">
            {loginError && (
              <div
                className="error-message"
                style={{ color: "red", marginBottom: "10px" }}
              >
                {loginError}
              </div>
            )}
            Don't have an account?{" "}
            <span onClick={() => setAction("Sign Up")}>Sign Up</span>
          </div>
          <div className="submit-container">
            <button
              className="btn btn-custom btn-lg page-scroll"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
};