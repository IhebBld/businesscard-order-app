import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./order.css";
function Order() {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);
  useEffect(() => {
    if (deleted) {
      setDeleted(false);
      axios
        .get("/mycardmaker")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [deleted]);
  function handleDelete(id) {
    axios
      .delete(`/delete/${id}`)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => console.log(err));
  }
  return (
    <main className="main-container">
      <div id="order" className="container">
        <div className="main-title">
          <h3>Orders</h3>
        </div>
        <div className="d-flex justify-content-end">
          <Link className="btn btn-success" to="/form">
            Add Order
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Job</th>
              <th>Company</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Website</th>
              <th>Design</th>
              <th>User Id</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order, index) => {
              //added index
              return (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.name}</td>
                  <td>{order.job}</td>
                  <td>{order.company}</td>
                  <td>{order.phone}</td>
                  <td>{order.email}</td>
                  <td>{order.website}</td>
                  <td>{order.design}</td>
                  <td>{order.user_id}</td>
                  <td>
                    <Link
                      className="btn mx-2 btn-success"
                      to={`/read/${order.id}`}
                    >
                      Read
                    </Link>
                    <Link
                      className="btn mx-2 btn-success"
                      to={`/edit/${order.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="btn mx-2 btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Order;
