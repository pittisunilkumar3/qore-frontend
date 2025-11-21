import React from "react";
import { cn } from "@/lib/utils";
import AppSidebar from "./AppSidebar";
import Navbar from "./Navbar";
import { useIsMobile } from "../../hooks/use-mobile";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const isMobile = useIsMobile();

  const handleSidebarToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  const sidebarClasses = cn(
    "perfect-sidebar",
    isMobile
      ? sidebarOpen
        ? "expanded"
        : "mobile-hidden"
      : sidebarOpen
        ? "expanded"
        : "collapsed"
  );

  const mainClasses = cn(
    "perfect-main",
    isMobile ? "mobile" : sidebarOpen ? "with-expanded-sidebar" : "with-collapsed-sidebar"
  );

  return (
    <div className={cn("perfect-layout sidebar-optimized")}>
      {/* Mobile overlay */}
      <div
        className={cn(
          "perfect-overlay",
          isMobile && sidebarOpen && "visible"
        )}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div className={sidebarClasses}>
        <AppSidebar
          isOpen={sidebarOpen}
          onOpenChange={setSidebarOpen}
          isMobile={isMobile}
        />
      </div>

      {/* Main content */}
      <div className={mainClasses}>
        <div className="perfect-navbar">
          <Navbar onMenuClick={handleSidebarToggle} />
        </div>

        <main className="perfect-content !p-0 bg-background/50">
          <div className="p-6 space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
