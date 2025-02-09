import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2025-01-27.acacia",
});

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("User is not authenticated", { status: 401 });
    }

    // Create a Standard Connect account without auto-accepting ToS
    const account = await stripe.accounts.create({
      type: "standard",
      country: "US",
      business_type: "company",
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      business_profile: {
        mcc: "5045",
        url: "https://bestcookieco.com",
      },
      company: {
        address: {
          city: "Fairfax",
          line1: "123 State St",
          postal_code: "22031",
          state: "VA",
        },
        tax_id: "000000000",
        name: "The Best Cookie Co",
        phone: "8888675309",
      },
    });

    // Save the Stripe account ID to the user's record
    await client.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        stripeId: account.id,
      },
    });

    // Create an account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: "http://localhost:3000/callback/stripe/refresh",
      return_url: "http://localhost:3000/callback/stripe/success",
      type: "account_onboarding",
      collect: "currently_due",
    });

    return NextResponse.json({
      url: accountLink.url,
      accountId: account.id,
    });
  } catch (error) {
    console.error("Stripe account creation error:", error);
    return new NextResponse(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      }),
      { status: 500 }
    );
  }
}
