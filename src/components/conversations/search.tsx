/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { UseFormRegister } from "react-hook-form";

type Props = {
  domains?: {
    name: string;
    id: string;
    icon: string;
  }[];

  register: UseFormRegister<any>;
};

const ConversationSearch = ({ domains, register }: Props) => {
  return (
    <div className="flex flex-col py-3">
      <select
        {...register("domain")}
        className="px-3 py-4 text-sm border rounded-lg mr-5"
        defaultValue="" 
      >
        <option disabled value="">
          Domain name
        </option>
        {domains?.map((domain) => (
          <option value={domain.id} key={domain.id}>
            {domain.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ConversationSearch;
