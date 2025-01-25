"use server";
import { client } from "@/lib/prisma";
import { clerkClient, currentUser } from "@clerk/nextjs";

export const onGetSubcriptionPlan = async () => {
  try {
    const user = await currentUser();
    if (!user) return;

    const plan = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (plan) {
      return plan.subscription?.plan;
    }
  } catch (error) {
    console.log("onGetSubcriptionPlan", error);
  }
};

export const onGetAllAccountDomains = async () => {
  const user = await currentUser();
  if (!user) return;
  try {
    const domains = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
        domains: {
          select: {
            name: true,
            icon: true,
            id: true,
            customer: {
              select: {
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return { ...domains };
  } catch (error) {
    console.log("onGetAllAccountDomains", error);
  }
};

export const onIntegrateDomain = async (domain: string, icon: string) => {
  const user = await currentUser();
  if (!user) return;
  try {
    const subcription = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        _count: {
          select: {
            domains: true,
          },
        },
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    const domainExists = await client.user.findUnique({
      where: {
        clerkId: user.id,
        domains: {
          some: {
            name: domain,
          },
        },
      },
    });

    if (!domainExists) {
      if (
        (subcription?.subscription?.plan == "STANDARD" &&
          subcription._count.domains < 1) ||
        (subcription?.subscription?.plan == "PRO" &&
          subcription._count.domains < 5) ||
        (subcription?.subscription?.plan == "ULTIMATE" &&
          subcription._count.domains < 10)
      ) {
        const newDomain = await client.user.update({
          where: {
            clerkId: user.id,
          },
          data: {
            domains: {
              create: {
                name: domain,
                icon,
                chatBot: {
                  create: {
                    welcomeMessage: "Hey there, have a question? Text us here",
                  },
                },
              },
            },
          },
        });

        if (newDomain) {
          return { status: 200, message: "Domain added successfully" };
        }
      }
      return {
        status: 400,
        message:
          "You have reached maximum number of domains, please upgrade to proceed",
      };
    }
  } catch (error) {
    console.log("onIntegrateDomain", error);
  }
};

export const onUpdatedPassword = async (password: string) => {
  try {
    const user = await currentUser();
    if(!user) return null;

    const update = await clerkClient.users.updateUser(user.id,{password});
    if(update) return{status:200, message:'Password updated successfully'}
    
  } catch (error) {
    console.log("onUpdatedPassword",error)
  }
};
