import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  if (user) redirect("/dashboard");
  return (
    <div className="h-screen flex w-full justify-center">
      <div className="w-[600px] l:w-full flex flex-col items-start p-6">
        <p className="text-2xl font-semibold">Mark Bot</p>
        {children}
      </div>
      <div className="hidden lg:flex flex-1 w-full max-h-full items-center justify-center  overflow-hidden relative bg-cream flex-col pt-10  gap-3">
        <h2 className="text-gravel md:text-4xl text-center font-bold">
          Hi, I&apos;m your AI powerd sales assistant, Mark
        </h2>
        <p className="text-iridium text-center md:text-sm mb-10">
          Mark is capable of capturing lead information without a form..
          <br /> something that never been done before 😎
        </p>
        <div className="w-full h-full">
          <Image
            src="/images/app-ui.png"
            alt="app imahr"
            sizes="30"
            loading="lazy"
            className="w-full h-full top-48"
            width={0}
            height={0}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
