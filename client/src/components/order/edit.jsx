import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`/get_order/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`/edit_user/${id}`, data[0])
      .then((res) => {
        navigate("/order");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container-fluid vw-100 vh-100">
      <h1>User {id}</h1>
      <Link to="/dashboard" className="btn btn-success">
        Back
      </Link>
      {data.map((order) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="form-group my-3 ">
              <label htmlFor="name">Name</label>
              <input
                value={order.name}
                type="text"
                name="name"
                required
                onChange={(e) =>
                  setData([{ ...data[0], name: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="job">Job</label>
              <input
                value={order.job}
                type="text"
                name="job"
                required
                onChange={(e) => setData([{ ...data[0], job: e.target.value }])}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="company">Company</label>
              <input
                value={order.company}
                type="text"
                name="company"
                required
                onChange={(e) =>
                  setData([{ ...data[0], company: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="phone">Name</label>
              <input
                value={order.phone}
                type="tel"
                name="phone"
                required
                onChange={(e) =>
                  setData([{ ...data[0], phone: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="email">Email</label>
              <input
                value={order.email}
                type="email"
                name="email"
                required
                onChange={(e) =>
                  setData([{ ...data[0], email: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="website">Website</label>
              <input
                value={order.website}
                type="url"
                name="website"
                required
                onChange={(e) =>
                  setData([{ ...data[0], website: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </div>
          </form>
        );
      })}
    </div>
  );
}

export default Edit;
