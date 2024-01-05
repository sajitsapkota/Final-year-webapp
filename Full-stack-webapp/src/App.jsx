import { useState } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/common/header";
import Login from "./pages/auth/login";
import Regiester from "./pages/auth/regiester";
import Dashboard from "./admin/dashboard";

function App() {
  const location = useLocation()
  const authpage = location.pathname === "/adminlogin" || location.pathname === "/adminregiester"
  return (
    <>
     {!authpage &&  <Header/>}
      <Routes>
        <Route path="/adminlogin" element={<Login />} />
        <Route path="/adminregiester" element={<Regiester />} />
        <Route path="/admindashboard" element={<Dashboard />} />       
      </Routes>
    </>
  );
}
export default App;
