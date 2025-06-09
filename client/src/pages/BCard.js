import React, { useState, useEffect } from "react";
import { Navigation } from "../components/navigation";
import { Header } from "../components/header";
import { Contact } from "../components/contact";
import DesignForm from "../components/DesignForm";
import JsonData from "../data/formdata.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BCard() {
  const [pageData, setPageData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setPageData(JsonData);
  }, []);

  // Login check 
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:5000/login").then((response) => {
      if (response.data.loggedIn === false) {
        navigate("/login");
      }
    });
  }, [navigate]);

  return (
    <div>
      <Navigation />
      <Header data={pageData.Header} />
      <DesignForm />
      <Contact />
    </div>
  );
}