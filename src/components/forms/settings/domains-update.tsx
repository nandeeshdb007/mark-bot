import React from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import FormGenerator from "../form-generator";

type Props = {
  name: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

const DomainsUpdate = ({ name, register, errors }: Props) => {
  return (
    <div className="flex gap-2 px-2 pt-5 items-end w-[400px]">
      <FormGenerator
        id={"domain-name-update"}
        label="Domain name"
        register={register}
        name="domain"
        errors={errors}
        type="text"
        inputType="input"
        placeholder={name}
      />
    </div>
  );
};

export default DomainsUpdate;
