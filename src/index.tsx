import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AmplitudeLoader from "./utils/amplitude";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

AmplitudeLoader.initialize(process.env.REACT_APP_AMPLITUDE_KEY!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
