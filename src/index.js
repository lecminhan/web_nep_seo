import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ⭐ Fix lỗi JSON.parse("undefined") nếu redux_store chưa tồn tại
const reduxStoreRaw = localStorage.getItem("redux_store");
if (!reduxStoreRaw || reduxStoreRaw === "undefined") {
  localStorage.setItem("redux_store", "{}");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
);

reportWebVitals();
