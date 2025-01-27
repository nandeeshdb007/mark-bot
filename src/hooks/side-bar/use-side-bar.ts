"use client";
import { useEffect, useState } from "react";
import { useChatContext } from "../../context/use-chat-context";
import {
  onGetConversationMode,
  onToggleRealtime,
} from "@/actions/conversation";
import { usePathname,useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useClerk } from "@clerk/nextjs";

const useSideBar = () => {
  const [expand, setExpand] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [realtime, setRealtime] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { chatRoom } = useChatContext();

  const onActivateRealTime = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!chatRoom) return null;
      const realTime = await onToggleRealtime(
        chatRoom,
        e?.target?.ariaChecked == "true" ? false : true
      );
      if (realTime) {
        setRealtime(realTime.chatRoom.live);
        toast({
          title: "Success",
          description: realTime.message,
        });
      }
    } catch (error) {
      console.log("onActivateRealTime", error);
    }
  };

  const onGetCurrentMode = async () => {
    setLoading(true);
    const mode = await onGetConversationMode(chatRoom!);
    if (mode) {
      setRealtime(mode.live);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatRoom) {
      onGetCurrentMode();
    }
  }, [chatRoom]);

  const page = pathname.split("/").pop();
  const { signOut } = useClerk();
  const onSignOut = () => signOut(() => router.push("/"));
  const onExpand = () => setExpand((prev) => !prev);

  return {
    expand,
    onExpand,
    page,
    onSignOut,
    realtime,
    onActivateRealTime,
    chatRoom,
    loading,
  };
};

export default useSideBar;
