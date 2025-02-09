"use client"
import React from "react";
import { Button } from "react-day-picker";
import { Loader } from "../loader";
import { useStripe } from "@/hooks/billing/use-billing";

type Props = {
  connected: boolean;
};

const StripeConnect = ({ connected }: Props) => {
  const { onStripeConnect, onStripeAccountPending } = useStripe();
  return (
    <Button>
      <Loader loading={onStripeAccountPending}>
        {connected ? "Connected" : "Connect to Stripe"}
      </Loader>
    </Button>
  );
};

export default StripeConnect;
