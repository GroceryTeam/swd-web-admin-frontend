import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import "@fortawesome/fontawesome-free/css/all.min.css"
import "assets/styles/tailwind.min.css"
import 'antd/dist/antd.css'
import Dashboard from "views/Dashboard"

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/dashboard"
        element={
          <Dashboard />
       }
      />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
