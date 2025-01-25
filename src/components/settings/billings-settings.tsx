
import { onGetSubcriptionPlan } from "@/actions/settings";
import React from "react";
import Section from "../section-label";
import { Card, CardContent, CardDescription } from "../ui/card";
import { Plus } from "lucide-react";

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
      <div className="lg:col-span-2 flex justify-start lg:justify-center">
        <Card className="border-dahseed bg-cream border-gray-400 w-full cursor-pointer h-[270px] flex justify-center items-center">
          <CardContent className="flex gap-2 items-center">
            <div className="rounded-full border-2 p-1">
              <Plus className="text-gray-400" />
            </div>
            <CardDescription className="fonr-semibold">
              Upgrade Plan
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <h3 className="text-xl font-semibold mb-2">Curent Plan</h3>
        <p className="text-sm font-semibold">{plan}</p>
        <p>
          {plan == "PRO"
            ? "Start growing your business today"
            : plan == "ULTIMATE"
            ? "The ultimate growth plan that sets you up for success"
            : "Perfect if you are just getting started with Mark Bot"}
        </p>
      </div>
    </div>
  );
};

export default BillingsSettings;
