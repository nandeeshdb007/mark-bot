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
    if (!user) return null;

    const update = await clerkClient.users.updateUser(user.id, { password });
    if (update)
      return { status: 200, message: "Password updated successfully" };
  } catch (error) {
    console.log("onUpdatedPassword", error);
  }
};

export const onGetCurrentDomainInfo = async (domain: string) => {
  const user = await currentUser();
  if (!user) return;
  try {
    const userDomain = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        domains: {
          where: {
            name: {
              contains: domain,
            },
          },
          select: {
            id: true,
            name: true,
            icon: true,
            userId: true,
            products: true,
            chatBot: {
              select: {
                id: true,
                welcomeMessage: true,
                icon: true,
              },
            },
          },
        },
      },
    });
    if (userDomain) {
      return userDomain;
    }
  } catch (error) {
    console.log("onGetCurrentDomainInfo", error);
  }
};

export const onUpdateDomain = async (id: string, name: string) => {
  try {
    const domainExists = await client.domain.findFirst({
      where: {
        name: {
          contains: name,
        },
      },
    });

    if (!domainExists) {
      const domain = await client.domain.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });

      if (domain) {
        return {
          status: 200,
          message: "Domain updated",
        };
      }

      return {
        status: 400,
        message: "Oops something went wrong!",
      };
    }

    return {
      status: 400,
      message: "Domain with this name already exists",
    };
  } catch (error) {
    console.log(error);
  }
};

export const onChatBotImageUpdate = async (id: string, icon: string) => {
  const user = await currentUser();

  if (!user) return;

  try {
    const domain = await client.domain.update({
      where: {
        id,
      },
      data: {
        chatBot: {
          update: {
            data: {
              icon,
            },
          },
        },
      },
    });

    if (domain) {
      return {
        status: 200,
        message: "Domain updated",
      };
    }

    return {
      status: 400,
      message: "Oops something went wrong!",
    };
  } catch (error) {
    console.log(error);
  }
};

export const onUpdateWelcomeMessage = async (
  message: string,
  domainId: string
) => {
  try {
    const update = await client.domain.update({
      where: {
        id: domainId,
      },
      data: {
        chatBot: {
          update: {
            data: {
              welcomeMessage: message,
            },
          },
        },
      },
    });

    if (update) {
      return { status: 200, message: "Welcome message updated" };
    }
  } catch (error) {
    console.log(error);
  }
};

export const onDeleteUserDomain = async (id: string) => {
  const user = await currentUser();
  if (!user) return;
  try {
    const validUser = await client.user.findUnique({
      where: { clerkId: user.id },
      select: { id: true },
    });
    if (validUser) {
      const deletedDomain = await client.domain.delete({
        where: {
          userId: validUser.id,
          id,
        },
        select: {
          name: true,
        },
      });
      if (deletedDomain)
        return {
          status: 200,
          message: `${deletedDomain.name} was deleted successfully`,
        };
    }
  } catch (error) {
    console.log("onDeleteDomain", error);
  }
};

export const onCreateHelpDeskQuestion = async (
  id: string,
  question: string,
  answer: string
) => {
  try {
    const helpDeskQuetions = await client.domain.update({
      where: { id },
      data: {
        helpdesk: {
          create: {
            question,
            answer,
          },
        },
      },
      include: {
        helpdesk: {
          select: {
            id: true,
            question: true,
            answer: true,
          },
        },
      },
    });
    if (helpDeskQuetions) {
      return {
        status: 200,
        message: "New help desk question created",
        questions: helpDeskQuetions.helpdesk,
      };
    }

    return {
      status: 400,
      message: "Something went wrong",
    };
  } catch (error) {
    console.log("onCreateHelpDeskQuestion", error);
  }
};

export const onGetAllHelpDeskQuestions = async (id: string) => {
  try {
    const questions = await client.helpDesk.findMany({
      where: {
        domainId: id,
      },
      select: {
        question: true,
        answer: true,
        id: true,
      },
    });

    return {
      status: 200,
      message: "New help desk question added",
      question: questions,
    };
  } catch (error) {
    console.log("onGetAllHelpDeskQuestions", error);
  }
};

export const onCreateFilterQuestions = async (id: string, question: string) => {
  try {
    const filtredQuetion = await client.domain.update({
      where: { id },
      data: {
        filterQuestions: {
          create: {
            question,
          },
        },
      },
      include: {
        filterQuestions: {
          select: {
            id: true,
            question: true,
          },
        },
      },
    });
    if (filtredQuetion) {
      return {
        status: 200,
        questions: filtredQuetion.filterQuestions,
        message: "Filter question added",
      };
    }
    return {
      status: 400,
      message: "Something went wrong",
    };
  } catch (error) {
    console.log("onCreateFilterQuestions", error);
  }
};

export const onGetAllFilterQuestions = async (id: string) => {
  try {
    const questions = await client.filterQuestions.findMany({
      where: {
        domainId: id,
      },
      select: {
        question: true,
        id: true,
      },
      orderBy: {
        question: "asc",
      },
    });

    return { status: 200, message: "", questions: questions };
  } catch (error) {
    console.log("onGetAllFilterQuestions", error);
  }
};

export const onGetPaymentConnected = async () => {
  try {
    const user = await currentUser();
    if (user) {
      const connected = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          stripeId: true,
        },
      });
      if (connected) {
        return connected.stripeId;
      }
    }
  } catch (error) {
    console.log("onGetPaymentConnected", error);
  }
};

export const onCreateNewDomainProduct = async (
  id: string,
  name: string,
  image: string,
  price: string
) => {
  try {
    const product = await client.domain.update({
      where: {
        id,
      },
      data: {
        products: {
          create: {
            name,
            image,
            price: parseInt(price),
          },
        },
      },
    });

    if (product) {
      return {
        status: 200,
        message: "Product successfully created",
      };
    }
  } catch (error) {
    console.log(error);
  }
};
