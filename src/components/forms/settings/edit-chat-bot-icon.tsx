import Section from "@/components/section-label";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import UploadButton from "../../upload-button/index";
import Image from "next/image";
import { BotIcon } from "@/icons/bot-icon";

type Props = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  chatBot: {
    id: string;
    icon: string | null;
    welcomeMessage: string | null;
  } | null;
};

const EditChatBotIcon = ({ register, errors, chatBot }: Props) => {
  return (
    <div className="py-5 flex flex-col gap-5 items-start">
      <Section label="Chatbot icon" message="Change the icon for chatbot" />
      <UploadButton label="Edit image" register={register} errors={errors} />
      {chatBot?.icon ? (
        <div className="rounded-full overflow-hidden">
          <Image
            src={`https://ucarecdn.com/${chatBot.icon}/`}
            alt="chatBotIcon"
            width={40}
            height={40}
          />
        </div>
      ) : (
        <div className="rounded-full cursor-pointer shadow-md w-20 h-20 flex items-center justify-center bg-grandis">
          <BotIcon />
        </div>
      )}
    </div>
  );
};

export default EditChatBotIcon;
