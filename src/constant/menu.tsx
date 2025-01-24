import CalIcon from "@/icons/cal-icon";
import ChatIcon from "@/icons/chat-icon";
import EmailIcon from "@/icons/email-icon";
import HelpDeskIcon from "@/icons/help-desk-icon";
import IntegrationsIcon from "@/icons/integrations-icon";
import SettingsIcon from "@/icons/settings-icon";
import StarIcon from "@/icons/star-icon";
import TimerIcon from "@/icons/timer-icon";
import DashboardIcon from "@/icons/dashboard-icon";
import { JSX } from "react";

// Type definitions
type SidebarMenuProps = {
  label: string;
  icon: JSX.Element;
  path: string;
};

type TabsMenuProps = {
  label: string;
  icon?: JSX.Element;
};

// Icon mappings to avoid redundancy
const Icons = {
  dashboard: <DashboardIcon />,
  chat: <ChatIcon />,
  email: <EmailIcon />,
  helpDesk: <HelpDeskIcon />,
  integrations: <IntegrationsIcon />,
  settings: <SettingsIcon />,
  star: <StarIcon />,
  timer: <TimerIcon />,
  calendar: <CalIcon />,
};

// Sidebar menu configuration
export const SIDE_BAR_MENU: SidebarMenuProps[] = [
  { label: "Dashboard", icon: Icons.dashboard, path: "dashboard" },
  { label: "Conversations", icon: Icons.chat, path: "conversations" },
  { label: "Integrations", icon: Icons.integrations, path: "integrations" },
  { label: "Settings", icon: Icons.settings, path: "settings" },
  { label: "Appointments", icon: Icons.calendar, path: "appointments" },
  { label: "Email Marketing", icon: Icons.email, path: "email-marketing" },
] as const;

// Tabs menu configuration
export const TABS_MENU: TabsMenuProps[] = [
  { label: "unread", icon: Icons.email },
  { label: "all", icon: Icons.email },
  { label: "expired", icon: Icons.timer },
  { label: "starred", icon: Icons.star },
] as const;

// Help Desk tabs
export const HELP_DESK_TABS_MENU: TabsMenuProps[] = [
  { label: "help desk" },
  { label: "questions" },
] as const;

// Appointment table headers
export const APPOINTMENT_TABLE_HEADER = [
  "Name",
  "Requested Time",
  "Added Time",
  "Domain",
] as const;

// Email marketing table headers
export const EMAIL_MARKETING_HEADER = [
  "ID",
  "Email",
  "Answers",
  "Domain",
] as const;

// Bot tabs menu configuration
export const BOT_TABS_MENU: TabsMenuProps[] = [
  { label: "chat", icon: Icons.chat },
  { label: "helpdesk", icon: Icons.helpDesk },
] as const;
