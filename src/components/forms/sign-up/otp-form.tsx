import OTPInput from "@/components/otp";
import React, { FC } from "react";

const OtpForm: FC<{
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  onOTP: string;
}> = ({ setOtp, onOTP }) => {
  return (
    <>
      <h2 className="text-gravel md:text-4xl font-bold">Enter Otp</h2>
      <p className="text-iridium md:text-sm">
        Enter the one time password that was sent to your email
      </p>
      <div className="w-full justify-center flex py-5">
        <OTPInput otp={onOTP} setOtp={setOtp} />
      </div>
    </>
  );
};

export default OtpForm;
