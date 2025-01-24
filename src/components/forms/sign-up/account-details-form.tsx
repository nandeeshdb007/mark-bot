import React, { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

const AccountDetailsForm: FC<{
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}> = ({ register, errors }) => {
  return (
    <>
      <h2 className="text-gravel md:text-4xl font-bold">
        Account Details
      </h2>
      <p className="text-iridium md:text-sm">Enter your email and password</p>
    </>
  );
};

export default AccountDetailsForm;
