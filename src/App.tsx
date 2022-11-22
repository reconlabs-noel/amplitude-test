import React, { useCallback, useEffect } from "react";
import "./App.css";
import AmplitudeLoader from "./utils/analyticsInstance";

function App() {
  useEffect(() => {
    AmplitudeLoader.initialize(process.env.REACT_APP_AMPLITUDE_KEY!);
  }, []);

  return (
    <div className="App">
      <div>Amplitude Test</div>
      <button
        onClick={() => {
          AmplitudeLoader.setUserId("noel@reconlabs.kr");
        }}
        data-event-name="click-first"
        data-event-prop-button-type="normal"
        data-event-prop-button-color="red"
      >
        set namju
      </button>
      <button
        onClick={() => {
          AmplitudeLoader.sendEvent("click-first", { type: "normal", id: AmplitudeLoader.userId });
        }}
        data-event-name="click-first"
        data-event-prop-button-type="normal"
        data-event-prop-button-color="red"
      >
        click-first: normal
      </button>
      <button data-event-name="click-second" data-event-prop-button-type="normal">
        click-second: normal
      </button>
      <button data-event-name="click-second" data-event-prop-button-type="other">
        click-second: other
      </button>
      <button onClick={() => {}}>reset</button>
    </div>
  );
}

export default App;
