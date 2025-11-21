import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BarChart3, Users, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Recruitment", icon: Users, href: "#" },
    { label: "Analytics", icon: BarChart3, href: "#" },
    { label: "Settings", icon: Settings, href: "#" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="flex pt-16">
        <aside className="w-64 bg-gray-950 text-gray-100 flex flex-col border-r border-border/40">
        <div className="h-16 flex items-center px-6 border-b border-border/40">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-recruit-primary to-recruit-secondary flex items-center justify-center text-white font-bold text-lg">
              Q
            </div>
            <div>
              <div className="font-bold text-lg tracking-tight">QORE</div>
              <div className="text-xs text-gray-400">Company Dashboard</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.href !== "#" && location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                to={item.href === "#" ? "/dashboard" : item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-border/40 text-xs text-gray-400 flex items-center justify-between">
          <span>Signed in as Admin</span>
          <button className="flex items-center gap-1 text-gray-400 hover:text-white text-xs">
            <LogOut className="h-3 w-3" />
            <span>Logout</span>
          </button>
        </div>
        </aside>

        <main className="flex-1 min-h-screen bg-background/50">
          <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
