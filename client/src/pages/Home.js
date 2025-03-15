import { Navigation } from "../components/navigation";
import { Header } from "../components/header";
import { Product } from "../components/product";
import { Process } from "../components/process";
import { Gallery } from "../components/gallery";
import { Contact } from "../components/contact";
import JsonData from "../data/data.json";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);



  return (
    <div className='Home-Page'>
      <Navigation />
      <Header data={landingPageData.Header} />
      <Product data={landingPageData.Product} />
      <Process data={landingPageData.Process} />
      <Gallery data={landingPageData.Gallery} />
      <Contact data={landingPageData.Contact} />
    </div>
  )
}