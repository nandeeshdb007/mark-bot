import { SIDE_BAR_MENU } from "@/constant/menu";
import { LogOut, Menu, MonitorSmartphone } from "lucide-react";
import Image from "next/image";
import React from "react";
import DomainMenu from "./domain-menu";
import MenuItem from "./menu-item";

type Props = {
  onExpand(): void;
  current: string;
  onSignOut(): void;
  domains:
    | {
        id: string;
        name: string;
        icon: string ;
      }[]
    | null
    | undefined;
};

const MaxMenu = ({ onExpand, current, onSignOut, domains }: Props) => {
  return (
    <div className="py-3 px-4 flex flex-col h-full">
      <div className="div flex justify-between items-center">
        <Image
          src="images/logo.png"
          alt="logo"
          sizes="100vw"
          className="animate-fade0in opacity-0 delay-300 fill-mode-forwards"
          style={{
            width: "50%",
            height: "auto",
          }}
          width={0}
          height={0}
        />
        <Menu
          className="cursor-pointer animate-fade-in opacity-0 delay-300 fill-mode-forwards"
          onClick={onExpand}
        />
        <div className="animate-fade-on opacity-0 delay-300 fill-mode-forwards flex flex-col justify-between h-full pt-10">
          <div className="flex flex-col">
            <p className="text-xs text-gray-500 mb-3">MENU</p>
            {SIDE_BAR_MENU.map((menu, index) => (
              <MenuItem size="max" key={index} current={current} {...menu} />
            ))}
            <DomainMenu domains={domains} />
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-gray-500">OPTIONS</p>
            <MenuItem
              size="max"
              label="Sign Out"
              icon={<LogOut />}
              onSignOut={onSignOut}
              current={current}
            />
            <MenuItem
              size="max"
              label="Sign Out"
              icon={<MonitorSmartphone />}
              onSignOut={onSignOut}
              current={current}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaxMenu;
