import { client } from "@/lib/prisma";
import { puhserSever } from "@/lib/utils";

export const onToggleRealtine = async (id: string, state: boolean) => {
  try {
    const chatRoom = await client.chatRoom.update({
      where: {
        id,
      },
      data: {
        live: state,
      },
      select: {
        id: true,
        live: true,
      },
    });
    if (chatRoom) {
      return {
        status: 200,
        message: chatRoom.live
          ? "Realtime mode enabled"
          : "Realtime mode disabled",
        chatRoom,
      };
    }
  } catch (error) {
    console.log("onToggleRealtine", error);
  }
};

export const onGetConversationMode = async (id: string) => {
  try {
    const mode = await client.chatRoom.findUnique({
      where: {
        id,
      },
      select: {
        live: true,
      },
    });
    return mode;
  } catch (error) {
    console.log("onGetConversationMode", error);
  }
};

export const onGetDomainChatRooms = async (id: string) => {
  try {
    const domains = await client.domain.findUnique({
      where: {
        id,
      },
      select: {
        customer: {
          select: {
            email: true,
            chatRoom: {
              select: {
                createdAt: true,
                id: true,
                message: {
                  select: {
                    message: true,
                    createdAt: true,
                    seen: true,
                  },
                  orderBy: {
                    createdAt: "desc",
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });
    if (domains) {
      return domains;
    }
  } catch (error) {
    console.log("onGetDomainChatRooms", error);
  }
};

export const onGetChatMessages = async (id: string) => {
  try {
    const messages = await client.chatRoom.findMany({
      where: {
        id,
      },
      select: {
        id: true,
        live: true,
        message: {
          select: {
            id: true,
            role: true,
            message: true,
            createdAt: true,
            seen: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (messages) {
      return messages;
    }
  } catch (error) {
    console.log("onGetChatMessages", error);
  }
};

export const onViewUnReadMessages = async (id: string) => {
  try {
    await client.chatMessage.updateMany({
      where: {
        chatRoomId: id,
      },
      data: {
        seen: true,
      },
    });
  } catch (error) {
    console.log("onViewUnReadMessages", error);
  }
};

export const onOwnwerSendMessage = async (
  chatRoom: string,
  message: string,
  role: "assistant" | "user"
) => {
  try {
    const chat = await client.chatRoom.update({
      where: {
        id: chatRoom,
      },
      data: {
        message: {
          create: {
            message,
            role,
          },
        },
      },
      select: {
        message: {
          select: {
            id: true,
            role: true,
            message: true,
            createdAt: true,
            seen: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    if (chat) {
      return chat;
    }
  } catch (error) {
    console.log("onOwnwerSendMessage", error);
  }
};

export const onRelTimeChat = async (
  chatRoomId: string,
  message: string,
  id: string,
  role: "assistant" | "user"
) => {
  puhserSever.trigger(chatRoomId, "realtime-mode", {
    chat: {
      message,
      id,
      role,
    },
  });
};


// export const onOwnwer 