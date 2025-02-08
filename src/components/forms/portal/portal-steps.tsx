"use client";
import React from "react";
import QuestionForm from "./question-form";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  questions: {
    id: string;
    question: string;
    answered: string | null;
  }[];
  type: "Appointment" | "Payment";
  register: UseFormRegister<FieldValues>;
  error: FieldErrors<FieldValues>;
  onNext(): void;
  step: number;
  date: Date | undefined;
  onBooking: React.Dispatch<React.SetStateAction<Date | undefined>>;
  onBack(): void;
  onSlot(slot: string): void;
  slot?: string;
  loading: boolean;
  bookings?:
    | {
        date: Date;
        slot: string;
      }[]
    | undefined;
  products?:
    | {
        name: string;
        image: string;
        price: number;
      }[]
    | undefined;
  amount?: number;
  stripeId?: string;
};

const PortalSteps = ({
  questions,
  type,
  register,
  error,
  onNext,
  step,
  onBooking,
  date,
  onBack,
  onSlot,
  loading,
  slot,
  products,
  bookings,
  amount,
  stripeId,
}: Props) => {
  console.log("steppppp", step);
  if (step == 2) {
    return (
      <QuestionForm
        resgister={register}
        error={error}
        onNext={onNext}
        questions={questions}
      />
    );
  }

  //   if (step == 1 && type == "Appointment") {
  //     return (
  //       <BookAppointmentDate
  //         date={date}
  //         booking={bookings}
  //         currentSlot={register}
  //         onBack={onBack}
  //         onBooking={onBooking}
  //         onSlot={onSlot}
  //         loading={loading}
  //       />
  //     );
  //   }

  return <></>;
};

export default PortalSteps;
