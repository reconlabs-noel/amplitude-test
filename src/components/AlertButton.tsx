import React from "react";
import { useRDSAlert } from "@reconlabs/reconlabs-fe-components-stag/dist_ts/components/reconlabs-design-system/notification/RDSProvider";

type AlertButtonProps = {};

const AlertButton = (props: AlertButtonProps) => {
  const { sendAlert } = useRDSAlert();

  return (
    <button
      onClick={() => {
        sendAlert({ type: "success", message: "테스트입니다" });
      }}
    >
      Send success alert
    </button>
  );
};

export default AlertButton;
