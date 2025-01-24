/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRegistrationProps } from "@/constant/forms";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Textarea } from "@/components/ui/textarea";

interface FormGenaratorInterface extends UserRegistrationProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  lines?: number;
  form?: string;
}

const FormGenerator = ({
  type,
  inputType,
  options,
  label,
  placeholder,
  name,
  register,
  errors,
  lines,
  form,
}: FormGenaratorInterface) => {
  switch (inputType) {
    case "input":
      return (
        <Label className="flex flex-col gap-2" htmlFor={`input-${label}`}>
          {label && label}
          <Input
            id={`input-${label}`}
            type={type}
            placeholder={placeholder}
            form={form}
            {...register(name)}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }: { message: string }) => (
              <p className="text-red-400 mt-2 ">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );

    case "select":
      return (
        <Label htmlFor={`select-${label}`}>
          {label && label}
          <select form={form} id={`select-${label}`} {...register(name)}>
            {options?.length &&
              options.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }: { message: string }) => (
              <p className="text-red-400 mt-2 ">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );

    case "textarea":
      return (
        <Label htmlFor={`select-${label}`}>
          {label && label}
          <Textarea
            form={form}
            id={`input-${label}`}
            placeholder={placeholder}
            {...register(name)}
            rows={lines}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }: { message: string }) => (
              <p className="text-red-400 mt-2 ">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );
    default: return <></>
  }
  return <div></div>;
};

export default FormGenerator;
