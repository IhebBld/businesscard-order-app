import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
export const Navigation = (props) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  //login button
  const [log, setlog] = useState(false);
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:5000/login").then((response) => {
      if (response.data.loggedIn == true) {
        setlog(true);
        setRole(response.data.user[0].role); //role
      }
    });
  }, [navigate]);

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="/">
            MyCardMaker
          </a>{" "}
        </div>
        {isHomePage && (
          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="#product" className="page-scroll">
                  Product
                </a>
              </li>
              <li>
                <a href="#process" className="page-scroll">
                  Process
                </a>
              </li>
              <li>
                <a href="#gallery" className="page-scroll">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="page-scroll">
                  Contact
                </a>
              </li>
              {log == true && role == "admin" && (
                <li>
                  <a href="/dashboard" className="page-scroll">
                    Dashboard
                  </a>
                </li>
              )}
              {log == true && (
                <li>
                  <a href="/account" className="page-scroll">
                    Account
                  </a>
                </li>
              )}
              {log == false ? (
                <li>
                  <a href="/login" className="page-scroll">
                    Login
                  </a>
                </li>
              ) : (
                <li>
                  <a
                    href="/"
                    className="page-scroll"
                    onClick={() => {
                      fetch("/logout", { method: "POST" });
                      // .then(
                      //   () => (window.location.href = "/login")
                      // );
                    }}
                  >
                    Logout
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};
