import axios from "axios";
import React, { useEffect, useState } from "react";
import "../order/order.css";
function Customers() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/customors")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  });
  return (
    <main className="main-container">
      <div id="order" className="container">
        <div className="main-title">
          <h3>Customers</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((Customer, index) => {
              //added index
              return (
                <tr key={index}>
                  <td>{Customer.id}</td>
                  <td>{Customer.username}</td>
                  <td>{Customer.useremail}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
export default Customers;
