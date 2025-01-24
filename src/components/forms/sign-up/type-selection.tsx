"use client";
import React, { FC } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import UserTypeCard from "./user-type-card";

const TypeSelectionForm: FC<{
  register: UseFormRegister<FieldValues>;
  userType: "owner" | "student";
  setUserType: React.Dispatch<React.SetStateAction<"owner" | "student">>;
}> = ({ register, userType, setUserType }) => {
  console.log("userType", userType);
  return (
    <>
      <h2 className="text-gravel md:text-4xl font-bold">Create an account</h2>
      <p className="text-iridium  md:text-sm">
        Tell us about yourself! What do you do? Lets tailor your <br />{" "}
        experience so it best suits you.
      </p>
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value="owner"
        title="I'm a bussiness owner"
        text="Setting up my account for my company"
      />
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value="student"
        title="I'm a student"
        text="Looking to learn about tool"
      />
    </>
  );
};

export default TypeSelectionForm;
