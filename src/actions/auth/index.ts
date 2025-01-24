/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { client } from "@/lib/prisma";

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
