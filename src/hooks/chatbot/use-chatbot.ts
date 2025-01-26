/* eslint-disable @typescript-eslint/no-explicit-any */
import { onAiChatBotAssistant, onGetCurrentChatBot } from "@/actions/bot";
import { postToParent, upload } from "@/lib/utils";
import {
  ChatBotMessageProps,
  ChatBotMessageSchema,
} from "@/schemas/conversation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export const useChatBot = () => {
  const { register, handleSubmit, reset } = useForm<ChatBotMessageProps>({
    resolver: zodResolver(ChatBotMessageSchema),
    mode: "onChange",
  });

  const [currentBot, setCurrentBot] = useState<
    | {
        name: string;
        chatBot: {
          id: string;
          icon: string | null;
          welcomeMessage: string | null;
          background: string | null;
          textColor: string | null;
          helpdesk: boolean;
        } | null;
        helpdesk: {
          id: string;
          question: string;
          answer: string;
          domainId: string | null;
        }[];
      }
    | undefined
  >();
  const messageWindowRef = useRef<HTMLDivElement | null>(null);
  const [botOpened, setBotOpended] = useState<boolean>(false);
  const onOpenChatBot = () => setBotOpended((prev) => !prev);
  const [loading, setLoading] = useState<boolean>(false);
  const [onChats, setOnChats] = useState<
    {
      role: "assistant" | "user";
      content: string;
      link?: string;
    }[]
  >([]);
  const [onAiTyping, setOnAiTyping] = useState<boolean>(false);
  const [currentBotId, setCurrentBotId] = useState<string>();
  const [onRealTime, setOnRealTime] = useState<
    { chatroom: string; mode: boolean } | undefined
  >(undefined);
  let limitRequest = 0;

  const onScrollToBottom = () => {
    messageWindowRef.current?.scroll({
      top: messageWindowRef.current.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    onScrollToBottom();
  }, [onChats, messageWindowRef]);

  useEffect(() => {
    postToParent(
      JSON.stringify({
        width: botOpened ? 550 : 80,
        height: botOpened ? 800 : 80,
      })
    );
  }, [botOpened]);

  useEffect(() => {
    window.addEventListener("message", (e) => {
      const botId = e.data;

      if (limitRequest < 1 && typeof botId == "string") {
        onGetDomainChatBot(botId);
        limitRequest++;
      }
    });
  }, []);

  const onGetDomainChatBot = async (id: string) => {
    setCurrentBotId(id);
    const chatBot = await onGetCurrentChatBot(id);
    if (chatBot) {
      setOnChats((prev) => [
        ...prev,
        {
          role: "assistant",
          content: chatBot.chatBot?.welcomeMessage ?? "",
        },
      ]);
      setCurrentBot(chatBot);
      setLoading(false);
    }
  };

  const onStartChatting = handleSubmit(async (values) => {
    reset();
    if (values.image.length) {
      const uploaded = await upload.uploadFile(values.image[0]);
      setOnChats((prev) => [
        ...prev,
        {
          role: "user",
          content: uploaded.uuid,
        },
      ]);
      setOnAiTyping(true);
      const response: any = await onAiChatBotAssistant(
        currentBotId!,
        onChats,
        "user",
        uploaded.uuid
      );

      if (response) {
        setOnAiTyping(false);
        if (response.live) {
          setOnRealTime((prev) => ({
            ...prev,
            chatroom: response.chatRoom,
            mode: response.live,
          }));
        } else {
          setOnChats((prev) => [...prev, response?.response]);
        }
      }
    }

    if (values.content) {
      setOnChats((prev) => [
        ...prev,
        {
          role: "user",
          content: values.content ?? "",
        },
      ]);

      setOnAiTyping(true);
      const response: any = await onAiChatBotAssistant(
        currentBotId ?? "",
        onChats,
        "user",
        values.content
      );

      if (response) {
        setOnAiTyping(false);
        if (response.live) {
          setOnRealTime((prev) => ({
            ...prev,
            chatroom: response.chatRoom,
            mode: response.live,
          }));
        } else {
          setOnChats((prev) => [...prev, response.response]);
        }
      }
    }
  });

  return {
    botOpened,
    onOpenChatBot,
    onStartChatting,
    onChats,
    register,
    onAiTyping,
    messageWindowRef,
    currentBot,
    loading,
    setOnChats,
    onRealTime,
  };
};
