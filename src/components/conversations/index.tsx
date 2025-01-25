"use client";
import { useConversation } from "@/hooks/conversations/use-conversation";
import React from "react";
import TabsMenu from "../tabs";
import { TABS_MENU } from "@/constant/menu";
import { TabsContent } from "@radix-ui/react-tabs";
import ConversationSearch from "./search";
import { Loader } from "../loader";
import ChatCard from "./chat-card";
import { CardDescription } from "../ui/card";

type Props = {
  domains?:
    | {
        name: string;
        id: string;
        icon: string;
      }[]
    | undefined;
};

const ConversationMenu = ({ domains }: Props) => {
  const { register, chatRooms, loading, getActiveChatMessages } =
    useConversation();
  return (
    <div className="py-3 px-0">
      <TabsMenu triggers={TABS_MENU} className="">
        <TabsContent value="unread">
          <ConversationSearch domains={domains} register={register} />
          <div className="flex flex-col items-center">
            <Loader loading={loading}>
              {chatRooms.length ? (
                chatRooms.map((room) => (
                  <ChatCard
                    seen={room.chatRoom[0].message[0]?.seen}
                    id={room.chatRoom[0].id}
                    onChat={() => getActiveChatMessages(room.chatRoom[0].id)}
                    createdAt={room.chatRoom[0].message[0]?.createdAt}
                    key={room.chatRoom[0].id}
                    title={room.email!}
                    description={room.chatRoom[0].message[0]?.message}
                  />
                ))
              ) : (
                <CardDescription className="mt-3">
                  No chats for your domains
                </CardDescription>
              )}
            </Loader>
          </div>
        </TabsContent>
      </TabsMenu>
    </div>
  );
};

export default ConversationMenu;
