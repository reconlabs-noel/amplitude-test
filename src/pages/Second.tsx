import React, { useEffect, useState } from "react";
import AmplitudeLoader from "../utils/amplitude";
import * as AmplitudeEvents from "../utils/amplitudeEvents";
import { useRDSAlert } from "@reconlabs/reconlabs-fe-components-stag/dist_ts/components/reconlabs-design-system/notification/RDSProvider";
import { RDSCard, RDSCarousel, RDSPagination } from "@reconlabs/reconlabs-fe-components-stag";

type Props = {};

const Second = (props: Props) => {
  const { sendAlert } = useRDSAlert();
  const [slideCurrent, setSlideCurrent] = useState<number>(1);

  return <div className="App">RDSProvider test</div>;
};

export default Second;
