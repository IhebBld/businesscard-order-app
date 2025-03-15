import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Submition = () => {
  const [values, setValues] = useState({
    name: "",
    job: "",
    company: "",
    phone: "",
    email: "",
    website: "",
  });
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("/add_user", values)
      .then((res) => {
        navigate("/designs");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div id="CardForm" className=" text-center">
      <div className="container">
        <div className="row">
          <div className="section-title">
            <h2>Business Card Form</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <legend>
              <h3 className="text-left">Personal Information</h3>
            </legend>
            <div className="form-group">
              <label id="name-label" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Enter your full name"
                required
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label id="job-label" htmlFor="job">
                Job Title
              </label>
              <input
                type="text"
                name="job"
                id="job"
                className="form-control"
                placeholder="Enter your job title"
                required
                onChange={(e) => setValues({ ...values, job: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label id="company-label" htmlFor="company">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                id="company"
                className="form-control"
                placeholder="Enter your company name"
                required
                onChange={(e) =>
                  setValues({ ...values, company: e.target.value })
                }
              />
            </div>
            <legend>
              <h3 className="text-left">Contact Information</h3>
            </legend>
            <div className="form-group">
              <label id="phone-label" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-control"
                placeholder="Enter your phone number"
                required
                onChange={(e) =>
                  setValues({ ...values, phone: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label id="email-label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your Email"
                required
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label id="website-label" htmlFor="website">
                Website
              </label>
              <input
                type="url"
                name="website"
                id="website"
                className="form-control"
                placeholder="Enter your website link (e.g., LinkedIn, Portfolio, Company Website...)"
                required
                onChange={(e) =>
                  setValues({ ...values, website: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                id="submit"
                className="btn btn-custom btn-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
