import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  console.log(user);
  if (user) redirect("/");
  return (
    <div className="h-screen flex w-full justify-center">
      <div className="w-[600px] l:w-full flex flex-col items-start p-6">
       <p className="text-2xl font-semibold">Mark Bot</p>
        {children}
      </div>
      <div className="hidden lg:flex flex-1 w-full max-h-full max-w-[4000px] overflow-hidden relative bg-cream flex-col pt-10 pl-24 gap-3">
        <h2 className="text-gravel md:text-4xl font-bold">
          Hi, I&apos;m your AI powerd sales assistant, Mark
        </h2>
        <p className="text-iridium md:text-sm mb-10">
          Mark is capable of capturing lead information without a form..
          <br /> something that never been done before 😎
        </p>
        <Image
          src="/images/app-ui.png"
          alt="app imahr"
          sizes="30"
          loading="lazy"
          className="absolute shrink-0 !w-[700px] top-48"
          width={0}
          height={0}
        />
      </div>
    </div>
  );
};

export default AuthLayout;
