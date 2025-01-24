import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const SignIn = () => {
  return (
    <div className="flex-1 py-36 md:px-16 w-full">
      <div className="flex flex-col h-full gap-3">
        <SignInFormProvider>
          <div className="flex flex-col gap-3">
            <LoginForm />
            <div className="w-full flex gap-3 items-center">
              <Button type="submit" className="w-full">
                Submit
              </Button>
              <p>
                Dont have an account?{" "}
                <Link
                  href={"/auth/sign-up"}
                  className="text-blue-600 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </SignInFormProvider>
      </div>
    </div>
  );
};

export default SignIn;
