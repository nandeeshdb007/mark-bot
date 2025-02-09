import { useState } from "react";
import axios from "axios";

export const useStripe = () => {
  const [onStripeAccountPending, setOnStripeAccountPending] = useState(false);

  const onStripeConnect = async () => {
    try {
      setOnStripeAccountPending(true);
      const account = await axios.get("/api/stripe/connect");
      if (account) {
        setOnStripeAccountPending(false);
        window.location.href = account.data.url;
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return{
    onStripeAccountPending,
    onStripeConnect
  }
};
