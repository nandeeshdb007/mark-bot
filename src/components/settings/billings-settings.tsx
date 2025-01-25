import { onGetSubcriptionPlan } from "@/actions/settings";
import React from "react";
import Section from "../section-label";
import { Card, CardContent, CardDescription } from "../ui/card";
import { Check, CheckCircle2, Plus } from "lucide-react";
import { pricingCards } from "@/constant/landing-page";

const BillingsSettings = async () => {
  const plan = await onGetSubcriptionPlan();
  const planFeatures = pricingCards.find(
    (card) => card.title.toUpperCase() === plan
  )?.features;

  if (!planFeatures) return;
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
        <div className="div flex flex-col items-start gap-2 mt-2">
          {planFeatures.map((feature) => (
            <div key={feature} className="flex gap-2">
              <CheckCircle2 className="text-muted-foreground" />
              <p className="text-muted-foreground">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillingsSettings;
