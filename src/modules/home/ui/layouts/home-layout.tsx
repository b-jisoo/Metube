import { SidebarProvider } from "@/components/ui/sidebar";
import { HomeNavbar } from "../components/home-navbar";
import { HomeSidebar } from "../components/home-sidebar";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <HomeNavbar />
        <main className="flex overflow-y-auto">
          <HomeSidebar />
          <div className="flex-1 min-h-screen pt-[4rem]">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};
