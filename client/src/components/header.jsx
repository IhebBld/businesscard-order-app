import React from "react";
import { useLocation } from "react-router-dom";

export const Header = (props) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isFormPage = location.pathname === "/businesscard";
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                {isHomePage && (
                  <h1>
                    {props.data ? props.data.title : "Loading"}
                    <span></span>
                  </h1>
                )}
                {isFormPage && (
                  <h2>
                    {props.data ? props.data.title : "Loading"}
                    <span></span>
                  </h2>
                )}

                <p>{props.data ? props.data.paragraph : "Loading"}</p>
                {isHomePage && (
                  <a href="/businesscard" className="btn btn-custom btn-lg page-scroll">
                    Create
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
