"use client";
import { usePortal } from "@/hooks/portal/use-portal";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import PortalSteps from "./portal-steps";

type PortalFormProps = {
  questions: {
    id: string;
    question: string;
    answered: string | null;
  }[];
  type: "Appointment" | "Payment";
  customerId: string;
  domainid: string;
  email: string;
  bookings?: {
    date: Date;
    slot: string;
  }[];
  products?: {
    name: string;
    image: string;
    price: number;
  }[];
  amount?: number;
  stripeId?: string;
};

const PortalForm = ({
  questions,
  type,
  customerId,
  domainid,
  bookings,
  products,
  email,
  amount,
  stripeId,
}: PortalFormProps) => {
  const {
    step,
    onNext,
    onPrev,
    register,
    errors,
    date,
    setDate,
    onBookAppointment,
    onSelectedTimeSlot,
    selectedSlot,
    loading,
  } = usePortal(customerId, domainid, email);

  useEffect(() => {
    console.log("inside")
    const allQuestionsAnswered = questions.every((question) => question.answered);
    if (allQuestionsAnswered) {
      onNext();
    }
  }, []); 

  return (
    <form
      className="h-full flex flex-col gap-10 justify-center"
      onSubmit={(e) => {
        e.preventDefault(); // Fix 2: Prevent default form submission
        onBookAppointment();
      }}
    >
      <PortalSteps
        loading={loading}
        slot={selectedSlot}
        bookings={bookings}
        onSlot={onSelectedTimeSlot}
        date={date}
        onBooking={setDate}
        step={1}
        type={type}
        questions={questions}
        error={errors}
        register={register}
        onNext={onNext}
        products={products}
        onBack={onPrev}
        amount={amount}
        stripeId={stripeId}
      />
      {(step === 1 || step === 2) && ( // Fix 3: Use strict equality
        <div className="w-full flex justify-center">
          <div className="w-[400px] grid grid-cols-2 gap-3">
            <div
              className={cn(
                "rounded-full h-2 col-span-1",
                step === 1 ? "bg-orange" : "bg-platinum"
              )}
            />
            <div
              className={cn(
                "rounded-full h-2 col-span-1",
                step === 2 ? "bg-orange" : "bg-platinum"
              )}
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default PortalForm;