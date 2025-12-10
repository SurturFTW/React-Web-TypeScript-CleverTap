import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

import "./index.css";

// import HomePage from "./ProductExperiences/paymentPage";
// import PaymentPage from "./ProductExperiences/paymentPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<App />} />
        {/* <Route path="/payment" element={<PaymentPage />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
