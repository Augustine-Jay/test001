import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./index";
import "antd/dist/antd.css";
// import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Home />
  </StrictMode>
);
