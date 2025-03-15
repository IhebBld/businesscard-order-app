import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Read() {
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
  return (
    <div className="container-fluid vw-100 vh-100 ">
      <h1>Order {id}</h1>
      <Link to="/dashboard" className="btn btn-success">
        Back
      </Link>
      {data.map((order) => {
        return (
          <ul className="list-group">
            <li className="list-group-item">
              <b>ID: </b>
              {order["id"]}
            </li>
            <li className="list-group-item">
              <b>Name: </b>
              {order["name"]}
            </li>
            <li className="list-group-item">
              <b>Job: </b>
              {order["job"]}
            </li>
            <li className="list-group-item">
              <b>Company: </b>
              {order["company"]}
            </li>
            <li className="list-group-item">
              <b>Phone: </b>
              {order["phone"]}
            </li>
            <li className="list-group-item">
              <b>Email: </b>
              {order["email"]}
            </li>
            <li className="list-group-item">
              <b>Website: </b>
              {order["website"]}
            </li>
            <li className="list-group-item">
              <b>User Id: </b>
              {order["user_id"]}
            </li>
          </ul>
        );
      })}
    </div>
  );
}

export default Read;
