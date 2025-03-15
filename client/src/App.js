import SmoothScroll from "smooth-scroll";
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Form from './pages/CardForm';
import Design from './pages/Designs';
import Signup from "./pages/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Edit from "./components/order/edit";
import Read from "./components/order/read";
import Unauthorized from "./components/login/unauthorized";
import Profil from "./pages/profil/profil";
export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/form' element={<Form />} />
          <Route path="/designs" element={<Design />} />
          <Route path="/login" element={<Signup />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/read/:id' element={<Read />} />
          <Route path="/account" element={<Profil />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;



