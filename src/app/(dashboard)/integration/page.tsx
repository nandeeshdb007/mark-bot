import { onGetPaymentConnected } from "@/actions/settings";
import InfoBar from "@/components/infobar";
import IntegrationsList from "@/components/integrations";
import React from "react";


const IntegrationPage = async () => {
  const payment = await onGetPaymentConnected();
  const connections = {
    stripe: payment ? true : false,
  };
  return (
    <div>
      <InfoBar />
      <IntegrationsList connections={connections} />
    </div>
  );
};

export default IntegrationPage;
