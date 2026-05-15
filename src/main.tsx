import React from "react";
import ReactDOM from "react-dom/client";
import { DesktopWikiChrome } from "./prototype/DesktopWikiChrome";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DesktopWikiChrome />
  </React.StrictMode>
);
