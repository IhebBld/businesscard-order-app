import axios from "axios";
import React, { useEffect, useState } from "react";
import "../order/order.css";
function Products() {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);
  useEffect(() => {
    if (deleted) {
      setDeleted(false);
      axios
        .get("/productsList")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [deleted]);

  function handleDelete(id) {
    axios
      .delete(`/deleteProduct/${id}`)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => console.log(err));
  }
  return (
    <main className="main-container">
      <div id="order" className="container">
        <div className="main-title">
          <h3>Products List:</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Order Id</th>
              <th>PRODUCTS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((Product, index) => {
              return (
                <tr key={index}>
                  <td>{Product.id}</td>
                  <td>{Product.user_order_id}</td>
                  <td>{Product.image}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(Product.id)}
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
export default Products;
