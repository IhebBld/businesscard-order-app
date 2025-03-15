import React, { useState, useEffect } from "react";
import { BsFillArchiveFill, BsPeopleFill, BsListCheck } from "react-icons/bs";
function DashPage() {
  //orders customers number
  const [orderCount, setOrderCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [prodCount, setProdCount] = useState(0);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/mycardmaker");
        const data = await response.json();
        setOrderCount(data.length);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    const fetchCustomers = async () => {
      try {
        const response = await fetch("/mycardmaker/customers");
        const data = await response.json();
        setCustomerCount(data.customerCount);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    const fetchProds = async () => {
      try {
        const response = await fetch("/productsList");
        const data = await response.json();
        setProdCount(data.length);
      } catch (error) {
        console.error("Error fetching prods:", error);
      }
    };
    fetchOrders();
    fetchCustomers();
    fetchProds();
  }, []);

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>Finished Orders</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>{prodCount}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{customerCount}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>ORDERS</h3>
            <BsListCheck className="card_icon" />
          </div>
          <h1>{orderCount}</h1>
        </div>
      </div>
    </main>
  );
}

export default DashPage;
