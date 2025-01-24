"use client";
import { USER_LOGIN_FORM } from "@/constant/forms";
import React from "react";
import { useFormContext } from "react-hook-form";
import FormGenerator from "../form-generator";

const LoginForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <h2 className="text-gravel md:text-4xl font-bold">Login</h2>
      <p className="text-iridium md:text-sm">
        You will receive a one time password
      </p>
      {USER_LOGIN_FORM.map((filed) => (
        <FormGenerator
          key={filed.id}
          {...filed}
          errors={errors}
          register={register}
          name={filed.name}
        />
      ))}
    </>
  );
};

export default LoginForm;
