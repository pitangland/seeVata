import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Wel from "../pages/Welcome";
import Make from "../pages/Make";
import Done from "../pages/Done";
import Manager from "../pages/Manager";

export default function Router({ authService }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} authService={authService} />
        <Route path="/Login" element={<Login />} authService={authService} />
        <Route path="/Wel" element={<Wel />} authService={authService} />
        <Route path="/Make" element={<Make />} authService={authService} />
        <Route path="/Done" element={<Done />} authService={authService} />
        <Route
          path="/Manager"
          element={<Manager />}
          authService={authService}
        />
      </Routes>
    </BrowserRouter>
  );
}
