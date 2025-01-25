import Section from "@/components/section-label";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import FormGenerator from "../form-generator";

type GreetingsMessageProps = {
  message: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

const GreetingsMessage = ({ message, register, errors }: GreetingsMessageProps) => {
  return (
    <div className="fkex flex-col gap-2">
      <Section
        label="Greeting message"
        message="Customize your welcome message"
      />
      <div className="lg:w-[500px]">
        <FormGenerator
          id={"welcomeMssage"}
          placeholder={message}
          inputType="textarea"
          lines={2}
          register={register}
          errors={errors}
          name="welcomeMessage"
          type="text"
        />
      </div>
    </div>
  );
};

export default GreetingsMessage;
