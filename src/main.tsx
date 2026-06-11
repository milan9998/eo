import "./styles.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import EOHome from "./routes/index";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EOHome />
  </StrictMode>,
);
