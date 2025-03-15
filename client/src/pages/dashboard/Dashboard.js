import React, { useEffect, useState } from "react";
import DashHeader from "../../components/dashboard/dashHeader";
import DashSidebar from "../../components/dashboard/dashSidebar";
import DashPage from "../../components/dashboard/dashPage";
import Order from "../../components/order/Order";
import Customers from "../../components/dashboard/customers";
import Uploadimg from "../../components/dashboard/uploadimg";
import Products from "../../components/dashboard/productsList";
import "./dashboard.css";
import Axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
export default function Dashboard() {
  //roles code
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:5000/login").then((response) => {
      if (response.data.loggedIn == true) {
        setRole(response.data.user[0].role);
      } else {
        navigate("/unauthorized");
      }
    });
  }, [navigate]);

  //dashboard code
  const [action, setAction] = useState("Dashboard");
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <div>
      {role == "admin" && (
        <div id="dashboard">
          <div className="grid-container">
            <DashHeader OpenSidebar={OpenSidebar} />
            <DashSidebar
              openSidebarToggle={openSidebarToggle}
              OpenSidebar={OpenSidebar}
              setAction={setAction}
            />
            {action === "Dashboard" ? (
              <DashPage />
            ) : action === "Order" ? (
              <div className="main-container">
                <Order />
              </div>
            ) : action === "Customers" ? (
              <div className="main-container">
                {" "}
                <Customers />
              </div>
            ) : action == "Products" ? (
              <div className="main-container">
                <Uploadimg />
                <Products />
              </div>
            ) : (
              <div>No content available for this action.</div>
            )}
          </div>
        </div>
      )}
      {role == "user" && <Navigate to="/unauthorized" />}
    </div>
  );
}
