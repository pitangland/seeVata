import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import Make from "../pages/Make";

export default function Router({ authService }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} authService={authService} />
        <Route path="/Make" element={<Make />} authService={authService} />
      </Routes>
    </BrowserRouter>
  );
}
