import { StrictMode } from "react";
import { renderToString } from "react-dom/server";

import EOHome from "./routes/index";

// Build-time render of the marketing page to static HTML so crawlers receive
// the full content immediately (prerendering). Hydrated on the client.
export function render() {
  return renderToString(
    <StrictMode>
      <EOHome />
    </StrictMode>,
  );
}
