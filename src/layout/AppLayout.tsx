import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";

import BottomNav from "./BottomNav";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex overflow-hidden">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>

      <div
        className={`
    flex-1
    min-w-0
    transition-all
    duration-300
    ease-in-out
    ${isExpanded || isHovered
            ? "lg:ml-[290px]"
            : "lg:ml-[90px]"
          }
    ${isMobileOpen ? "ml-0" : ""}
  `}
      >
        <AppHeader />

        {/* IMPORTANT: Add bottom padding for mobile */}
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6 pb-20 lg:pb-6">
          <Outlet />
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <BottomNav />
    </div>
  );
};;

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
