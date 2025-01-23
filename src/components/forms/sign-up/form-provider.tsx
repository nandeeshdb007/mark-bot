import { AuthContextProvider } from "@/context/use-auth-context";
import React, { FC } from "react";

const SignUpFormProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};

export default SignUpFormProvider;
