"use client";
import Section from "@/components/section-label";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useHelpDesk } from "@/hooks/settings/use-settings";
import React from "react";
import FormGenerator from "../form-generator";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import Accordion from "@/components/accordion";

type Props = {
  id: string;
};

const HelpDesk = ({ id }: Props) => {
  const { register, errors, onSubmitQuestionHandler, isQuestions, loading } =
    useHelpDesk(id);
  return (
    <Card className="w-full grid grid-cols-1 lg:grid-cols-2">
      <CardContent className="p-6 border-r-[1px]">
        <CardTitle>Help Desk</CardTitle>
        <form
          onSubmit={onSubmitQuestionHandler}
          className="flex flex-col gap-6 mt-10"
        >
          <div className="flex flex-col gap-3">
            <Section
              label="Question"
              message="Add a questions that you believe is frequently asked"
            />
            <FormGenerator
              id={"help-desk-question"}
              inputType="input"
              register={register}
              errors={errors}
              form="help-desk-form"
              name="question"
              placeholder="Type your question"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Section
              label="Anwer to question"
              message="The answer for the question above."
            />
            <FormGenerator
              id={"help-desk-answer"}
              inputType="textarea"
              register={register}
              errors={errors}
              form="help-desk-form"
              name="answer"
              placeholder="Type your anwer"
              type="text"
              lines={5}
            />
          </div>
          <Button
            type="submit"
            className="bg-orange hover:bg-orange hover:opacity-70 transition duration-150 ease-in-out text-white font-semibold"
          >
            Create
          </Button>
        </form>
      </CardContent>
      <CardContent className="p-6 overflow-y-auto chat-window">
        <Loader loading={loading}>
          {isQuestions.length ? (
            isQuestions.map((question) => (
              <Accordion
                key={question.id}
                trigger={question.question}
                content={question.answer}
              />
            ))
          ) : (
            <CardDescription>No Questions to show</CardDescription>
          )}
        </Loader>
      </CardContent>
    </Card>
  );
};

export default HelpDesk;
