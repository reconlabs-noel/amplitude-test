import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AmplitudeLoader from "./utils/amplitude";
import { RDSProvider } from "@reconlabs/reconlabs-fe-components-stag/dist_ts/components/reconlabs-design-system/notification/RDSProvider";
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

AmplitudeLoader.initialize(process.env.REACT_APP_AMPLITUDE_KEY!);

root.render(
  <React.StrictMode>
    <RDSProvider>
      <App />
    </RDSProvider>
  </React.StrictMode>
);
