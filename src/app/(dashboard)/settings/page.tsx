import InfoBar from "@/components/infobar";
import BillingsSettings from "@/components/settings/billings-settings";
import React from "react";

const SettingsPage = () => {
  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-fullchat-window flex-1 h-0 flex flex-col gap-10 ">
        <BillingsSettings />
      </div>
    </>
  );
};

export default SettingsPage;
