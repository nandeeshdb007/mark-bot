import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import FormGenerator from "../form-generator";
import { Button } from "@/components/ui/button";

type Props = {
  questions: {
    id: string;
    question: string;
    answered: string | null;
  }[];
  resgister: UseFormRegister<FieldValues>;
  error: FieldErrors<FieldErrors>;
  onNext(): void;
};

const QuestionForm = ({ questions, resgister, error, onNext }: Props) => {
  return (
    <div className="flex flex-col gap-5 justify-center">
      <div className="flex justify-center">
        <h2 className="text-xl font-bold mb-5">Account Details</h2>
      </div>
      {questions.map((question) => (
        <FormGenerator
          id={`question-${question.id}`}
          defaultValue={question.answered || ""}
          key={question.id}
          name={`question-${question.id}`}
          errors={error}
          register={resgister}
          label={question.question}
          type="text"
          inputType="input"
          placeholder={question.answered || "Not answered"}
        />
      ))}
      <Button className="mt-5" type="button" onClick={onNext}>
        Next
      </Button>
    </div>
  );
};

export default QuestionForm;
