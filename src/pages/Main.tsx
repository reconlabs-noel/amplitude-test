import React, { useEffect, useState } from "react";
import AmplitudeLoader from "../utils/amplitude";
import * as AmplitudeEvents from "../utils/amplitudeEvents";
import { useRDSAlert } from "@reconlabs/reconlabs-fe-components-stag/dist_ts/components/reconlabs-design-system/notification/RDSProvider";
import { useNavigate } from "react-router-dom";
import AlertButton from "../components/AlertButton";
import Carousel from "../components/Carousel";
import { RDSCard, RDSCarousel, RDSPagination } from "@reconlabs/reconlabs-fe-components-stag";

type Props = {};

const Main = (props: Props) => {
  const { sendAlert } = useRDSAlert();
  const [slideCurrent, setSlideCurrent] = useState<number>(1);
  const navigate = useNavigate();

  // useEffect(() => {
  //   AmplitudeLoader.sendEvent(AmplitudeEvents.visitEvent.main);
  // }, []);

  return (
    <div className="App">
      {/* <div>Amplitude Test</div>
      <AlertButton />
      <button
        onClick={() => {
          AmplitudeLoader.setUserId("noel-test@reconlabs.kr");
        }}
      >
        Set userID
      </button>
      <button
        onClick={() => {
          AmplitudeLoader.sendEvent(AmplitudeEvents.clickEvent["click-first"], { type: "normal", id: AmplitudeLoader.userId });
        }}
      >
        click-first: normal
      </button>
      <button
        onClick={() => {
          AmplitudeLoader.sendEvent(AmplitudeEvents.clickEvent["click-second"], { type: "normal", id: AmplitudeLoader.userId });
        }}
      >
        click-second: normal
      </button>
      <button
        onClick={() => {
          AmplitudeLoader.sendEvent(AmplitudeEvents.clickEvent["click-second"], { type: "other", id: AmplitudeLoader.userId });
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
      <button
        onClick={() => {
          AmplitudeLoader.setUserId("asdfasdwqeq1231");
        }}
      >
        setRandom
      </button>

      <button
        onClick={() => {
          AmplitudeLoader.initialize(process.env.REACT_APP_AMPLITUDE_KEY!);
        }}
      >
        initialize
      </button>

      <button
        onClick={() => {
          navigate("/second");
        }}
      >
        Go to second
      </button>
      <div> */}
    </div>
  );
};

export default Main;
