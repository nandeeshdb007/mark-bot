/* eslint-disable @typescript-eslint/ban-ts-comment */
"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2025-01-27.acacia",
});

export const onCreateCustomerPaymentIntentSecret = async (
  amount: number,
  stripeId: string
) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: amount,
        currency: "inr",
        description: "Description of goods/services being exported",
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: "always",
        },
        capture_method: "automatic_async",
        shipping: {
          // Changed from payment_method_data to shipping
          name: "John Doe",
          address: {
            line1: "123 Test Street",
            city: "Mumbai",
            state: "Maharashtra",
            postal_code: "400001",
            country: "IN",
          },
          phone: "+91123456789",
        },
        receipt_email: "john@example.com", // Moved email here
      },
      { stripeAccount: stripeId }
    );

    if (paymentIntent) {
      return { secret: paymentIntent.client_secret };
    }
  } catch (error) {
    console.log(error);
  }
};

export const onUpdateSubscription = async (
  plan: "STANDARD" | "PLUS" | "ULTIMATE"
) => {
  try {
    const user = await currentUser();
    if (!user) return;
    const update = await client.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        subscription: {
          update: {
            data: {
              //@ts-ignore
              plan: plan,
              credits: plan == "PLUS" ? 50 : plan == "ULTIMATE" ? 500 : 10,
            },
          },
        },
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    if (update) {
      return {
        status: 200,
        message: "subscription updated",
        //@ts-ignore
        plan: update.subscription?.plan,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const setPlanAmount = (item: "STANDARD" | "PLUS" | "ULTIMATE") => {
  if (item == "PLUS") {
    return 700;
  }
  if (item == "ULTIMATE") {
    return 1500;
  }
  return 0;
};

export const onGetStripeClientSecret = async (
  item: "STANDARD" | "PLUS" | "ULTIMATE"
) => {
  try {
    const amount = setPlanAmount(item);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "inr",
      description: "Description of goods/services being exported",
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "always",
      },
      capture_method: "automatic_async",
      shipping: {
        name: "John Doe",
        address: {
          line1: "123 Test Street",
          city: "Mumbai",
          state: "Maharashtra",
          postal_code: "400001",
          country: "IN",
        },
        phone: "+91123456789",
      },
      receipt_email: "john@example.com",
    });

    if (paymentIntent) {
      return { secret: paymentIntent.client_secret };
    }
  } catch (error) {
    console.log(error);
  }
};
