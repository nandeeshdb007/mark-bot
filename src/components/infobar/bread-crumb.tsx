"use client";
import useSideBar from "@/hooks/side-bar/use-side-bar";
import React from "react";
import { Loader } from "../loader";
import { Switch } from "../ui/switch";

const BreadCrumb = () => {
  const {
    chatRoom,
    expand,
    loading,
    onActivateRealTime,
    onExpand,
    page,
    onSignOut,
    realtime,
  } = useSideBar();

  let content: string;
  switch (page) {
    case "settings":
      content = "Mange your account settings, prefernce and integrations";
    case "dashboard":
      content =
        "A detailed overview of your metrics, usage, customers and more";
    case "appointment":
      content = " View and edit all your appointments";
    case "email-marketing":
      content = " Send bulk emails to your customers";
    case "integration":
      content = "Connect third party application into Mark AI";
    default:
      content =
        "Modify domain settings, change chatbot options, enter sales questions and train your bot o what you want it to...";
  }
  return (
    <div className="flex flex-col">
      <div className="flex gap-5 items-center">
        <h2 className="text-3xl font-bold capitalize">
          {page === "conversation" && chatRoom && (
            <Loader loading={loading} className="p-0 inline">
              <Switch
                defaultChecked={realtime}
                onClick={(e: any) => onActivateRealTime(e)}
                className="data-[state=checked]:bg-orange data-[state=unchecked]:bg-peach"
              />
            </Loader>
          )}
        </h2>
      </div>
      <p className="text-gray-500 text-sm">{content}</p>
    </div>
  );
};

export default BreadCrumb;
