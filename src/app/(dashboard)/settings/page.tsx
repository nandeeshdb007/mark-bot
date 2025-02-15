import InfoBar from "@/components/infobar";
import BillingsSettings from "@/components/settings/billings-settings";
import ChangePassword from "@/components/settings/change-password";
import React from "react";

const SettingsPage = () => {
  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0 flex flex-col gap-10 ">
        <BillingsSettings />

        <ChangePassword />
      </div>
    </>
  );
};

export default SettingsPage;
