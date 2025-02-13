import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "../use-toast";
import {
  useElements,
  useStripe as useStripeHook,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import {
  onCreateCustomerPaymentIntentSecret,
  onGetStripeClientSecret,
  onUpdateSubscription,
} from "@/actions/stripe";

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

  return {
    onStripeAccountPending,
    onStripeConnect,
  };
};

export const useStripeCustomer = (amount: number, stripeId: string) => {
  const [stripeSecret, setStripeSecret] = useState<string>("");
  const [loadForm, setLoadForm] = useState<boolean>(false);

  const onGetCustomerIntent = async (amount: number) => {
    try {
      setLoadForm(true);
      const intent = await onCreateCustomerPaymentIntentSecret(
        amount,
        stripeId
      );
      if (intent) {
        setLoadForm(false);
        setStripeSecret(intent.secret!);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onGetCustomerIntent(amount);
  }, []);

  return { stripeSecret, loadForm };
};

export const useCompleteCustomerPayment = (onNext: () => void) => {
  const [PLUScessing, setPLUScessing] = useState<boolean>(false);
  const { toast } = useToast();
  const stripe = useStripeHook();
  const elements = useElements();

  const onMakePayment = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return null;
    }

    console.log("no reload");

    try {
      setPLUScessing(true);

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/settings",
        },
        redirect: "if_required",
      });

      if (error) {
        console.log(error);
      }

      if (paymentIntent?.status === "succeeded") {
        toast({
          title: "Success",
          description: "Payment complete",
        });
        onNext();
      }

      setPLUScessing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return { PLUScessing, onMakePayment };
};

export const useSubscriptions = (plan: "STANDARD" | "PLUS" | "ULTIMATE") => {
  const [loading, setLoading] = useState<boolean>(false);
  const [payment, setPayment] = useState<"STANDARD" | "PLUS" | "ULTIMATE">(
    plan
  );
  const { toast } = useToast();
  const router = useRouter();
  const onUpdatetToFreTier = async () => {
    try {
      setLoading(true);
      const free = await onUpdateSubscription("STANDARD");
      if (free) {
        setLoading(false);
        toast({
          title: "Success",
          description: free.message,
        });
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSetPayment = (payment: "STANDARD" | "PLUS" | "ULTIMATE") =>
    setPayment(payment);

  return {
    loading,
    onSetPayment,
    payment,
    onUpdatetToFreTier,
  };
};

export const useStripeElements = (
  payment: "STANDARD" | "PLUS" | "ULTIMATE"
) => {
  const [stripeSecret, setStripeSecret] = useState<string>("");
  const [loadForm, setLoadForm] = useState<boolean>(false);

  const onGetBillingIntent = async (
    plans: "STANDARD" | "PLUS" | "ULTIMATE"
  ) => {
    try {
      setLoadForm(true);
      const intent = await onGetStripeClientSecret(plans);
      if (intent) {
        setLoadForm(false);
        setStripeSecret(intent.secret!);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onGetBillingIntent(payment);
  }, [payment]);

  return { stripeSecret, loadForm };
};

export const useCompletePayment = (
  payment: "STANDARD" | "PLUS" | "ULTIMATE"
) => {
  const [PLUScessing, setPLUScessing] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  const stripe = useStripeHook();
  const elements = useElements();

  const onMakePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return null;
    }

    try {
      setPLUScessing(true);

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/settings",
        },
        redirect: "if_required",
      });

      if (error) {
        console.log(error);
      }

      if (paymentIntent?.status === "succeeded") {
        const plan = await onUpdateSubscription(payment);
        if (plan) {
          toast({
            title: "Success",
            description: plan.message,
          });
        }
      }

      setPLUScessing(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return { PLUScessing, onMakePayment };
};
