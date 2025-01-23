import SignUpFormProvider from "@/components/forms/sign-up/form-provider";
import React from "react";

const SignUp = () => {
  return (
    <div className="flex-1 py-36 md:px-6 w-full">
      <div className="flex flex-col h-full gap-3">
        <SignUpFormProvider>{<></>}</SignUpFormProvider>
      </div>
    </div>
  );
};

export default SignUp;
