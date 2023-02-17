import React from "react";
import { useRDSAlert } from "@reconlabs/reconlabs-fe-components-stag/dist_ts/components/reconlabs-design-system/notification/RDSProvider";

type Props = {};

const Button = (props: Props) => {
  return (
    <div className="">
      <img src="/qrcode_chrome.png" />
      {/* @ts-ignore */}
      <plicarzero-button viewer-uid="pIOTDoI03kcruv2sZPwGJ" color-type="secondary"></plicarzero-button>
      {/* @ts-ignore */}
      <plicarzero-viewer viewer-uid="pIOTDoI03kcruv2sZPwGJ" camera-controls exposure="1" environment-image="neutral"></plicarzero-viewer>
    </div>
  );
};

export default Button;
