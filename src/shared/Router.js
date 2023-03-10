import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Wel from "../pages/Welcome";
import Make from "../pages/Make";
import Comment from "../pages/Comment";
import Done from "../pages/Done";
import Main from "../pages/Main";
import Info from "../pages/Info";

import Manager from "../pages/Manager";

export default function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Wel" element={<Wel />} />
        <Route path="/Make" element={<Make />} />
        <Route path="/Make/:id" element={<Make />} />
        <Route path="/Com" element={<Comment />} />
        <Route path="/Done" element={<Done />} />
        <Route path="/Done/:id" element={<Done />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/Info" element={<Info />} />
        <Route path="/Manager" element={<Manager />} />
      </Routes>
    </BrowserRouter>
  );
}
