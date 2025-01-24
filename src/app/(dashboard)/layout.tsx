import { onLoginUser } from "@/actions/auth";
import SideBar from "@/components/sidebar";
import { ChatProvider } from "@/context/use-chat-context";

const DashBoardLayout = async ({ children }: { children: React.ReactNode }) => {
  const authenticated = await onLoginUser();
  if (!authenticated) return null;

  return (
    <ChatProvider>
      <div className="flex h-screen w-full">
        <SideBar domains={authenticated.domains} />
        {children}
      </div>
    </ChatProvider>
  );
};

export default DashBoardLayout;
