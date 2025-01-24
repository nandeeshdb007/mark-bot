import { onGetSubcriptionPlan } from "@/actions/settings";
import React from "react";
import Section from "../section-label";

const BillingsSettings = async () => {
  const plan = await onGetSubcriptionPlan();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      <div className="lg:col-span-1">
        <Section
          label="Billing settings"
          message="Add payment information, upgrade and modify your plans"
        />
      </div>
    </div>
  );
};

export default BillingsSettings;
