"use client"
import { Loader } from "@/components/loader";
import { AuthContextProvider } from "@/context/use-auth-context";
import { useSignUpForm } from "@/hooks/sign-up/use-sign-up";
import React, { FC } from "react";
import { FormProvider } from "react-hook-form";

const SignUpFormProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { onHandleSubmit, loading, methods } = useSignUpForm();
  return (
    <AuthContextProvider>
      <FormProvider {...methods}>
        <form className="h-full" onSubmit={onHandleSubmit}>
          <div className="flex flex-col justify-between gap-3 h-full">
            <Loader loading={loading}>{children}</Loader>
          </div>
        </form>
      </FormProvider>
    </AuthContextProvider>
  );
};

export default SignUpFormProvider;
