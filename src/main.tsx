import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/public/sw.js")
    .then((reg) => {
      console.log("Service Worker registered successfully", reg);
    })
    .catch(() => {
      console.error("Service Worker registration failed");
    });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
