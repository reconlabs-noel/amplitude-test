import React, { useEffect } from "react";
import "./App.css";
import AmplitudeLoader from "./utils/amplitude";

function App() {
  useEffect(() => {
    AmplitudeLoader.sendEvent("visited_main");
  }, []);

  return (
    <div className="App">
      <div>Amplitude Test</div>
      <button
        onClick={() => {
          AmplitudeLoader.setUserId("noel@reconlabs.kr");
        }}
      >
        Set UserId
      </button>
      <button
        onClick={() => {
          AmplitudeLoader.sendEvent("click-first", { type: "normal", id: AmplitudeLoader.userId });
        }}
      >
        click-first: normal
      </button>
      <button
        onClick={() => {
          AmplitudeLoader.sendEvent("click-second", { type: "normal", id: AmplitudeLoader.userId });
        }}
      >
        click-second: normal
      </button>
      <button
        onClick={() => {
          AmplitudeLoader.sendEvent("click-second", { type: "other", id: AmplitudeLoader.userId });
        }}
      >
        click-second: other
      </button>
      <button
        onClick={() => {
          AmplitudeLoader.reset();
        }}
      >
        reset
      </button>
    </div>
  );
}

export default App;
