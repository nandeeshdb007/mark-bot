"use client";
import Section from "@/components/section-label";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import FormGenerator from "../form-generator";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import { useFilterQuestion } from "@/hooks/settings/use-settings";

type Props = {
  id: string;
};

const FilterQuestions = ({ id }: Props) => {
  const { register, errors, onAddFilterQuestions, isQuestions, loading } =
    useFilterQuestion(id);

  return (
    <Card className="w-full grid grid-cols-1 lg:grid-cols-2">
      <CardContent className="p-6 border-r-[1px]">
        <CardTitle>Bot Questions</CardTitle>
        <form
          onSubmit={onAddFilterQuestions}
          className="flex flex-col gap-6 mt-10"
        >
          <div className="flex flex-col gap-3">
            <Section
              label="Question"
              message="Add a question that you want your chatbot to ask"
            />
            <FormGenerator
              id={"filter-question"}
              inputType="input"
              register={register}
              errors={errors}
              form="filter-questions-form"
              name="question"
              placeholder="Type your question"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Section
              label="Answer to question"
              message="The anwer for the question above"
            />
            <FormGenerator
            id={"filter-question-answer"}
              inputType="textarea"
              register={register}
              errors={errors}
              form="filter-questions-form"
              name="answer"
              placeholder="Type your answer"
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
              <p key={question.id} className="font-bold">
                {question.question}
              </p>
            ))
          ) : (
            <CardDescription>No Questions</CardDescription>
          )}
        </Loader>
      </CardContent>
    </Card>
  );
};

export default FilterQuestions;
