import { Navigation } from "../components/navigation";
import { Header } from "../components/header";
import { Contact } from "../components/contact";
import Prefrence from "../components/prefrence";
import JsonData from "../data/prefdata.json";
import React, { useState, useEffect } from "react";
export default function Design() {
  const [prefrencePageData, setPrefrencePageData] = useState({});
  useEffect(() => {
    setPrefrencePageData(JsonData);
  }, []);
  return (
    <div className='Home-Page'>
      <Navigation />
      <Header data={prefrencePageData.Header} />
      <Prefrence />
      <Contact />
    </div>
  )
}