import React from "react";

const BreadCrumb = ({ page }: { page: string }) => {
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
        content="Modify domain settings, change chatbot options, enter sales questions and train your bot o what you want it to..."
  }
  return (
    <div className="flex flex-col">
      <div className="flex gap-5 items-center">
        <h2 className="text-3xl font-bold capitalize">Title</h2>
        
      </div>
        <p className="text-gray-500 text-sm">{content}</p>
    </div>
  );
};

export default BreadCrumb;
