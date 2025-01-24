"use client"
import useSideBar from "@/hooks/side-bar/use-side-bar";
import { cn } from "@/lib/utils";
import React from "react";
import MaxMenu from "./max-menu";
import { MinMenu } from "./min-menu";

interface SideBarProps {
  domains:
    | {
        id: string;
        name: string;
        icon: string;
      }[]
    | null
    | undefined;
}

const SideBar = ({ domains }: SideBarProps) => {
  const { expand, onExpand, page, onSignOut } = useSideBar();

  return (
    <div
      className={cn(
        "bg-cream h-full w-[60px]  fill-mode-forwards fixed md:relative",
        expand == undefined && "",
        expand == true
          ? "animate-open-sidebar"
          : expand == false && "animate-close-sidebar"
      )}
    >
      {expand ? (
        <MaxMenu
          domains={domains}
          current={page!}
          onExpand={onExpand}
          onSignOut={onSignOut}
        />
      ) : (
        <MinMenu
          domains={domains}
          onShrink={onExpand}
          current={page!}
          onSignOut={onSignOut}
        />
      )}
    </div>
  );
};

export default SideBar;
