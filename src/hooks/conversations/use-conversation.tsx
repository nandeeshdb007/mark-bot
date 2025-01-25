import {
  onGetChatMessages,
  onGetDomainChatRooms,
} from "@/actions/conversation";
import { useChatContext } from "@/context/use-chat-context";
import {
  ConversationSearchProps,
  ConversationSearchSchema,
} from "@/schemas/conversation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useConversation = () => {
  const { register, watch } = useForm<ConversationSearchProps>({
    resolver: zodResolver(ConversationSearchSchema),
    mode: "onChange",
  });

  const { setLoading: loadMessages, setChatRoom, setChats } = useChatContext();
  const [chatRooms, setChatRooms] = useState<
    {
      chatRoom: {
        id: string;
        createdAt: Date;
        message: {
          message: string;
          createdAt: Date;
          seen: boolean;
        }[];
      }[];
      email: string | null;
    }[]
  >([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const search = watch(async (value) => {
      setLoading(true);
      try {
        const rooms = await onGetDomainChatRooms(value.domain || "");
        if (rooms) {
          setLoading(false);
          setChatRooms(rooms.customer);
        }
      } catch (error) {
        console.log(error);
      }
    });
    return () => search.unsubscribe();
  }, [watch]);

  const getActiveChatMessages = async (id: string) => {
    try {
      loadMessages(true);
      const messages = await onGetChatMessages(id);
      if (messages) {
        setChatRoom(id);
        loadMessages(false);
        setChats(messages[0].message);
      }
    } catch (error) {
      console.log("getActiveChatMessages", error);
    }
  };

  return {
    register,
    chatRooms,
    loading,
    getActiveChatMessages,
  };
};
