/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { client } from "@/lib/prisma";
import { onGetAllAccountDomains } from "../settings";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";

export const onCompleteUserResgistration = async (
  fullName: string,
  clerkId: string,
  type: string
) => {
  try {
    const registred = await client.user.create({
      data: {
        fullname: fullName,
        clerkId,
        type,
        subscription: {
          create: {},
        },
      },
      select: {
        fullname: true,
        id: true,
        type: true,
      },
    });

    if (registred) {
      return {
        status: 200,
        user: registred,
      };
    }
  } catch (error: any) {
    return {
      status: 400,
    };
  }
};

export const onLoginUser = async () => {
  const user = await currentUser();
  if (!user) redirectToSignIn();
  else {
    try {
      const autenticated = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          fullname: true,
          id: true,
          type: true,
        },
      });

      if (autenticated) {
        const domains = await onGetAllAccountDomains();
        return { status: 200, user: autenticated, domains: domains?.domains };
      }
    } catch (error) {
      console.log("onLoginUser", error);
    }
  }
};
