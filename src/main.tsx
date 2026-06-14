import "./styles.css";

import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import EOHome from "./routes/index";

const rootEl = document.getElementById("root")!;

const app = (
  <StrictMode>
    <EOHome />
  </StrictMode>
);

// The page is prerendered to static HTML at build time. If that markup is
// present, hydrate it; otherwise fall back to a clean client render.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
