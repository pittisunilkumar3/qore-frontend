/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { QuickLinksModal } from '@/components/ui/quick-links-modal';
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Calendar,
  MessageSquare,
  UserCog,
  Settings,
  LogOut,
  Building,
  FileSearch,
  FileText,
  UserPlus,
  DollarSign,
  PieChart,
  Upload,
  Briefcase,
  Shield,
  UserCheck,
  Eye,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Menu as MenuIcon,
  BookOpen,
  FolderOpen,
  FileUp,
  Mail,
  Send,
  Inbox,
  Archive,
  ClipboardList,
  FileCheck,
  GraduationCap,
  Workflow,
  Plus,
  BarChart,
  Calculator,
  TrendingUp,
  History,
  Handshake,
  Contact,
  CreditCard,
  Receipt,
  AlertTriangle,
  BarChart3,
  Grid3X3,
} from 'lucide-react';

// Static sidebar menu types (simplified from original app)
interface SubMenu {
  id: string | number;
  sub_menu: string;
  url?: string;
  icon?: string;
  is_active: boolean;
  level?: number;
}

interface SidebarMenu {
  id: string | number;
  menu: string;
  url?: string;
  icon?: string;
  level?: number;
  sub_menus?: SubMenu[];
}

type MenuItem = Omit<SidebarMenu, 'sub_menus'> & {
  sub_menus?: Array<SubMenu & { isActive?: boolean }>;
  isActive?: boolean;
};

// Icon mapping
const IconMap: Record<string, React.ElementType> = {
  "fa-users": Users,
  "fa-clipboard-check": ClipboardCheck,
  "fa-calendar": Calendar,
  "fa-comment-alt": MessageSquare,
  "fa-user-cog": UserCog,
  "fa-cog": Settings,
  "fa-building": Building,
  "fa-search": FileSearch,
  "fa-file-alt": FileText,
  "fa-user-plus": UserPlus,
  "fa-dollar-sign": DollarSign,
  "fa-chart-pie": PieChart,
  "fa-upload": Upload,
  "fa-briefcase": Briefcase,
  "fa-shield-alt": Shield,
  "fa-user-check": UserCheck,
  "fa-eye": Eye,
  "fa-tachometer-alt": LayoutDashboard,
  "fa-book-open": BookOpen,
  "fa-folder-open": FolderOpen,
  "fa-file-upload": FileUp,
  "fa-mail": Mail,
  "fa-envelope": Mail,
  "fa-send": Send,
  "fa-inbox": Inbox,
  "fa-archive": Archive,
  // Bench Resources icons
  "users": Users,
  "user-check": UserCheck,
  "workflow": Workflow,
  "settings": Settings,
  // Hotlist Management icons
  "mail": Mail,
  "plus": Plus,
  "calendar": Calendar,
  "bar-chart": BarChart,
  "file-text": FileText,
  // Add more icon mappings as needed
};

interface AppSidebarProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  isMobile?: boolean;
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  isOpen = true,
  onOpenChange,
  isMobile = false,
}) => {
  // Static user for this demo app
  const user = {
    name: 'Admin User',
    role: 'Company Admin',
  };
  const isAuthLoading = false;
  const location = useLocation();
  const navigate = useNavigate();
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);

  // Use isOpen prop instead of internal collapsed state for better synchronization
  const isCollapsed = !isOpen && !isMobile;

  const toggleDropdown = (menuTitle: string) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [menuTitle]: !prev[menuTitle]
    }));
  };

  const toggleSidebar = () => {
    onOpenChange?.(!isOpen);
  };

  // No dynamic API menus in this static demo
  const filteredMenus: MenuItem[] = [];

  const handleLogout = () => {
    navigate('/login');
  };

  const renderMenuIcon = (iconName?: string) => {
    if (!iconName) return null;
    const IconComponent = IconMap[iconName] || MenuIcon;
    return <IconComponent className="h-5 w-5 flex-shrink-0" />;
  };

  const renderSidebarContent = () => (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <div className="sidebar-header">
        <Link
          to="/dashboard"
          className={cn(
            "sidebar-logo",
            isCollapsed && "collapsed"
          )}
        >
          <div className="user-avatar">Q</div>
          {!isCollapsed && (
            <span className="text-lg font-bold">QORE</span>
          )}
        </Link>
        <div className="flex items-center gap-2">
          {/* Quick Links Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsQuickLinksOpen(true)}
                className="h-8 w-8 flex-shrink-0 quick-links-button"
                aria-label="Quick Links"
              >
                <Grid3X3 size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Quick Links</p>
            </TooltipContent>
          </Tooltip>

        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8 flex-shrink-0"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        )}
        </div>
      </div>

      {/* Navigation */}
      <div className="sidebar-nav">

        <Link
            to="/coming-soon"
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground text-primary hover:bg-primary/10",
              isCollapsed ? "justify-center" : "justify-between"
            )}
          >
            <div className="flex items-center">
            {!isCollapsed && (
              <>
                <span className="mr-2">Upcoming Features</span>
                <span className="px-1.5 py-0.5 bg-primary/20 rounded-full text-xs font-medium text-primary">New</span>
              </>
            )}
          </div>
          </Link>


        <Link
          to="/dashboard"
          className={cn(
            "nav-item",
            location.pathname === '/dashboard' && "active"
          )}
        >
          <LayoutDashboard className="nav-icon" />
          <span className={cn("nav-text", isCollapsed && "collapsed")}>
            Dashboard
          </span>
        </Link>

        {/* Documentation Menu */}
        <div>
          <button
            onClick={() => toggleDropdown('Documentation')}
            className={cn(
              "nav-item w-full justify-between",
              (location.pathname.startsWith('/documentation') ||
               location.pathname.startsWith('/document-templates') ||
               location.pathname.startsWith('/document-groups') ||
               location.pathname.startsWith('/manual-documents')) && "active"
            )}
            aria-expanded={openDropdowns['Documentation']}
            aria-controls="submenu-documentation"
          >
            <div className="flex items-center">
              <BookOpen className="nav-icon" />
              <span className={cn("nav-text", isCollapsed && "collapsed")}>
                Documentation
              </span>
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  openDropdowns['Documentation'] ? "rotate-180" : ""
                )}
              />
            )}
          </button>
          <div
            id="submenu-documentation"
            className={cn(
              "nav-dropdown",
              openDropdowns['Documentation'] && !isCollapsed ? "open" : "closed"
            )}
          >
            <Link
              to="/document-templates"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/document-templates') && "active"
              )}
            >
              Document Templates
            </Link>
            <Link
              to="/document-groups"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/document-groups') && "active"
              )}
            >
              Document Groups
            </Link>
            <Link
              to="/manual-documents"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/manual-documents') && "active"
              )}
            >
              Manual Documents
            </Link>
          </div>
        </div>

        {/* Email Templates Menu */}
        <div>
          <button
            onClick={() => toggleDropdown('Email Templates')}
            className={cn(
              "nav-item w-full justify-between",
              (location.pathname.startsWith('/email-templates') ||
               location.pathname.startsWith('/email-management') ||
               location.pathname.startsWith('/email-history')) && "active"
            )}
            aria-expanded={openDropdowns['Email Templates']}
            aria-controls="submenu-email-templates"
          >
            <div className="flex items-center">
              <Mail className="nav-icon" />
              <span className={cn("nav-text", isCollapsed && "collapsed")}>
                Email Templates
              </span>
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  openDropdowns['Email Templates'] ? "rotate-180" : ""
                )}
              />
            )}
          </button>
          <div
            id="submenu-email-templates"
            className={cn(
              "nav-dropdown",
              openDropdowns['Email Templates'] && !isCollapsed ? "open" : "closed"
            )}
          >
            <Link
              to="/email-templates"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/email-templates') && "active"
              )}
            >
              Template Manager
            </Link>
            <Link
              to="/email-management/received"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/email-management/received') && "active"
              )}
            >
              Received Emails
            </Link>
            <Link
              to="/email-management/sent"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/email-management/sent') && "active"
              )}
            >
              Sent History
            </Link>
            <Link
              to="/email-management/usage"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/email-management/usage') && "active"
              )}
            >
              Usage Tracking
            </Link>
          </div>
        </div>

        {/* Roles Management Menu */}
        <div>
          <button
            onClick={() => toggleDropdown('Roles Management')}
            className={cn(
              "nav-item w-full justify-between",
              location.pathname.startsWith('/roles') && "active"
            )}
            aria-expanded={openDropdowns['Roles Management']}
            aria-controls="submenu-roles-management"
          >
            <div className="flex items-center">
              <Users className="nav-icon" />
              <span className={cn("nav-text", isCollapsed && "collapsed")}>
                Roles Management
              </span>
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  openDropdowns['Roles Management'] ? "rotate-180" : ""
                )}
              />
            )}
          </button>
          <div
            id="submenu-roles-management"
            className={cn(
              "nav-dropdown",
              openDropdowns['Roles Management'] && !isCollapsed ? "open" : "closed"
            )}
          >
            <Link
              to="/roles"
              className={cn(
                "nav-dropdown-item",
                location.pathname === '/roles' && "active"
              )}
            >
              View Roles
            </Link>
            <Link
              to="/roles/add"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/roles/add') && "active"
              )}
            >
              Add Role
            </Link>
          </div>
        </div>

        {/* HR Onboarding Menu */}
        <div>
          <button
            onClick={() => toggleDropdown('HR Onboarding')}
            className={cn(
              "nav-item w-full justify-between",
              location.pathname.startsWith('/hr-onboarding') && "active"
            )}
            aria-expanded={openDropdowns['HR Onboarding']}
            aria-controls="submenu-hr-onboarding"
          >
            <div className="flex items-center">
              <UserPlus className="nav-icon" />
              <span className={cn("nav-text", isCollapsed && "collapsed")}>
                HR Onboarding
              </span>
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  openDropdowns['HR Onboarding'] ? "rotate-180" : ""
                )}
              />
            )}
          </button>
          <div
            id="submenu-hr-onboarding"
            className={cn(
              "nav-dropdown",
              openDropdowns['HR Onboarding'] && !isCollapsed ? "open" : "closed"
            )}
          >
            <Link
              to="/hr-onboarding/dashboard"
              className={cn(
                "nav-dropdown-item",
                location.pathname === '/hr-onboarding' || location.pathname === '/hr-onboarding/dashboard' ? "active" : ""
              )}
            >
              Dashboard
            </Link>
            <Link
              to="/hr-onboarding/candidates"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/hr-onboarding/candidates') && "active"
              )}
            >
              Candidates
            </Link>
            <Link
              to="/hr-onboarding/tasks"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/hr-onboarding/tasks') && "active"
              )}
            >
              Tasks
            </Link>
            <Link
              to="/hr-onboarding/documents"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/hr-onboarding/documents') && "active"
              )}
            >
              Documents
            </Link>
            <Link
              to="/hr-onboarding/training"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/hr-onboarding/training') && "active"
              )}
            >
              Training
            </Link>
          </div>
        </div>

        {/* Margin Calculator Menu */}
        <div>
          <button
            onClick={() => toggleDropdown('Margin Calculator')}
            className={cn(
              "nav-item w-full justify-between",
              location.pathname.startsWith('/margin-calculator') && "active"
            )}
            aria-expanded={openDropdowns['Margin Calculator']}
            aria-controls="submenu-margin-calculator"
          >
            <div className="flex items-center">
              <Calculator className="nav-icon" />
              <span className={cn("nav-text", isCollapsed && "collapsed")}>
                Margin Calculator
              </span>
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  openDropdowns['Margin Calculator'] ? "rotate-180" : ""
                )}
              />
            )}
          </button>
          <div
            id="submenu-margin-calculator"
            className={cn(
              "nav-dropdown",
              openDropdowns['Margin Calculator'] && !isCollapsed ? "open" : "closed"
            )}
          >
            <Link
              to="/margin-calculator/dashboard"
              className={cn(
                "nav-dropdown-item",
                location.pathname === '/margin-calculator' || location.pathname === '/margin-calculator/dashboard' ? "active" : ""
              )}
            >
              Dashboard
            </Link>
            <Link
              to="/margin-calculator/hourly"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/margin-calculator/hourly') && "active"
              )}
            >
              Hourly Calculator
            </Link>
            <Link
              to="/margin-calculator/w2-salary"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/margin-calculator/w2-salary') && "active"
              )}
            >
              W2 Salary Calculator
            </Link>
            <Link
              to="/margin-calculator/contractor"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/margin-calculator/contractor') && "active"
              )}
            >
              1099/C2C Calculator
            </Link>
            <Link
              to="/margin-calculator/approvals"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/margin-calculator/approvals') && "active"
              )}
            >
              Approvals
            </Link>
            <Link
              to="/margin-calculator/reports"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/margin-calculator/reports') && "active"
              )}
            >
              Reports & Audit
            </Link>
          </div>
        </div>

        {/* Bench Resources Menu */}
        <div>
          <button
            onClick={() => toggleDropdown('Bench Resources')}
            className={cn(
              "nav-item w-full justify-between",
              location.pathname.startsWith('/bench-resources') && "active"
            )}
            aria-expanded={openDropdowns['Bench Resources']}
            aria-controls="submenu-bench-resources"
          >
            <div className="flex items-center">
              <Users className="nav-icon" />
              <span className={cn("nav-text", isCollapsed && "collapsed")}>
                Bench Resources
              </span>
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  openDropdowns['Bench Resources'] ? "rotate-180" : ""
                )}
              />
            )}
          </button>
          <div
            id="submenu-bench-resources"
            className={cn(
              "nav-dropdown",
              openDropdowns['Bench Resources'] && !isCollapsed ? "open" : "closed"
            )}
          >
            <Link
              to="/bench-resources"
              className={cn(
                "nav-dropdown-item",
                location.pathname === '/bench-resources' ? "active" : ""
              )}
            >
              Available Resources
            </Link>
            <Link
              to="/bench-resources/pipeline"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/bench-resources/pipeline') && "active"
              )}
            >
              Status Pipeline
            </Link>
            <Link
              to="/bench-resources/settings"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/bench-resources/settings') && "active"
              )}
            >
              Auto-Enrollment Settings
            </Link>
          </div>
        </div>

        {/* Vendor Hub Menu */}
        <div>
          <button
            onClick={() => toggleDropdown('Vendor Hub')}
            className={cn(
              "nav-item w-full justify-between",
              location.pathname.startsWith('/vendor-hub') && "active"
            )}
            aria-expanded={openDropdowns['Vendor Hub']}
            aria-controls="submenu-vendor-hub"
          >
            <div className="flex items-center">
              <Handshake className="nav-icon" />
              <span className={cn("nav-text", isCollapsed && "collapsed")}>
                Vendor Hub
              </span>
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  openDropdowns['Vendor Hub'] ? "rotate-180" : ""
                )}
              />
            )}
          </button>
          <div
            id="submenu-vendor-hub"
            className={cn(
              "nav-dropdown",
              openDropdowns['Vendor Hub'] && !isCollapsed ? "open" : "closed"
            )}
          >
            <Link
              to="/vendor-hub/dashboard"
              className={cn(
                "nav-dropdown-item",
                location.pathname === '/vendor-hub' || location.pathname === '/vendor-hub/dashboard' ? "active" : ""
              )}
            >
              Dashboard
            </Link>
            <Link
              to="/vendor-hub/vendors"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/vendor-hub/vendors') && "active"
              )}
            >
              Vendor Registry
            </Link>
            <Link
              to="/vendor-hub/pocs"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/vendor-hub/pocs') && "active"
              )}
            >
              PoC Management
            </Link>
            <Link
              to="/vendor-hub/validation-reminders"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/vendor-hub/validation-reminders') && "active"
              )}
            >
              Validation Reminders
            </Link>
            <Link
              to="/vendor-hub/communication-logs"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/vendor-hub/communication-logs') && "active"
              )}
            >
              Communication Logs
            </Link>
            <Link
              to="/vendor-hub/reports"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/vendor-hub/reports') && "active"
              )}
            >
              Reports & Analytics
            </Link>
            <Link
              to="/vendor-hub/settings"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/vendor-hub/settings') && "active"
              )}
            >
              Settings
            </Link>
          </div>
        </div>

        {/* Hotlist Management Menu */}
        <div>
          <button
            onClick={() => toggleDropdown('Hotlist Management')}
            className={cn(
              "nav-item w-full justify-between",
              location.pathname.startsWith('/hotlists') && "active"
            )}
            aria-expanded={openDropdowns['Hotlist Management']}
            aria-controls="submenu-hotlist-management"
          >
            <div className="flex items-center">
              <Mail className="nav-icon" />
              <span className={cn("nav-text", isCollapsed && "collapsed")}>
                Hotlist Management
              </span>
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  openDropdowns['Hotlist Management'] ? "rotate-180" : ""
                )}
              />
            )}
          </button>
          <div
            id="submenu-hotlist-management"
            className={cn(
              "nav-dropdown",
              openDropdowns['Hotlist Management'] && !isCollapsed ? "open" : "closed"
            )}
          >
            <Link
              to="/hotlists"
              className={cn(
                "nav-dropdown-item",
                location.pathname === '/hotlists' ? "active" : ""
              )}
            >
              Dashboard
            </Link>
            <Link
              to="/hotlists/create"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/hotlists/create') && "active"
              )}
            >
              Create Hotlist
            </Link>
            <Link
              to="/hotlists/scheduled"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/hotlists/scheduled') && "active"
              )}
            >
              Scheduled Hotlists
            </Link>
            <Link
              to="/hotlists/analytics"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/hotlists/analytics') && "active"
              )}
            >
              Performance Analytics
            </Link>
            <Link
              to="/hotlists/templates"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/hotlists/templates') && "active"
              )}
            >
              Subject Templates
            </Link>
          </div>
        </div>

        {/* Accounts */}
        <div>
          <button
            onClick={() => toggleDropdown('Accounts')}
            className={cn(
              "nav-item w-full justify-between",
              location.pathname.startsWith('/accounts') && "active"
            )}
            aria-expanded={openDropdowns['Accounts']}
            aria-controls="submenu-accounts"
          >
            <div className="flex items-center">
              <CreditCard className="nav-icon" />
              <span className={cn("nav-text", isCollapsed && "collapsed")}>
                Accounts
              </span>
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  openDropdowns['Accounts'] ? "rotate-180" : ""
                )}
              />
            )}
          </button>
          <div
            id="submenu-accounts"
            className={cn(
              "nav-dropdown",
              openDropdowns['Accounts'] && !isCollapsed ? "open" : "closed"
            )}
          >
            <Link
              to="/accounts/invoices"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/accounts/invoices') && "active"
              )}
            >
              Invoices
            </Link>
            <Link
              to="/accounts/timesheets"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/accounts/timesheets') && "active"
              )}
            >
              Timesheets
            </Link>
            <Link
              to="/accounts/pto-management"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/accounts/pto-management') && "active"
              )}
            >
              PTO Management
            </Link>
            <Link
              to="/accounts/approvals"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/accounts/approvals') && "active"
              )}
            >
              Approvals
            </Link>
            <Link
              to="/accounts/overdue-dashboard"
              className={cn(
                "nav-dropdown-item",
                location.pathname.startsWith('/accounts/overdue-dashboard') && "active"
              )}
            >
              Overdue Dashboard
            </Link>
          </div>
        </div>

        {/* Menu Items */}
        {filteredMenus.map((menuItem) => {
          const hasSubMenus = menuItem.sub_menus && menuItem.sub_menus.length > 0;
          const isDropdownOpen = openDropdowns[menuItem.menu];
          const isActive = menuItem.isActive ||
            (hasSubMenus && menuItem.sub_menus?.some(sub => sub.isActive));

          return (
            <div key={menuItem.id}>
              {hasSubMenus ? (
                <>
                  <button
                    onClick={() => toggleDropdown(menuItem.menu)}
                    className={cn(
                      "nav-item w-full justify-between",
                      isActive && "active"
                    )}
                    aria-expanded={isDropdownOpen}
                    aria-controls={`submenu-${menuItem.id}`}
                  >
                    <div className="flex items-center">
                      {renderMenuIcon(menuItem.icon)}
                      <span className={cn("nav-text", isCollapsed && "collapsed")}>
                        {menuItem.menu}
                      </span>
                    </div>
                    {!isCollapsed && (
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          isDropdownOpen ? "rotate-180" : ""
                        )}
                      />
                    )}
                  </button>
                  <div
                    id={`submenu-${menuItem.id}`}
                    className={cn(
                      "nav-dropdown",
                      isDropdownOpen && !isCollapsed ? "open" : "closed"
                    )}
                  >
                    {menuItem.sub_menus?.map((subMenu) => (
                      <Link
                        key={subMenu.id}
                        to={subMenu.url || '#'}
                        className={cn(
                          "nav-dropdown-item",
                          subMenu.isActive && "active"
                        )}
                      >
                        {subMenu.sub_menu}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  to={menuItem.url || '#'}
                  className={cn(
                    "nav-item",
                    isActive && "active"
                  )}
                >
                  {renderMenuIcon(menuItem.icon)}
                  <span className={cn("nav-text", isCollapsed && "collapsed")}>
                    {menuItem.menu}
                  </span>
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* User Profile & Logout */}
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className={cn("user-info", isCollapsed && "collapsed")}>
            <div className="user-name">{user?.name || 'User'}</div>
            <div className="user-role">{user?.role || 'Role'}</div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="h-8 w-8 flex-shrink-0"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
    </div>
  );

  // For mobile, render a sheet
  if (isMobile) {
    return (
      <>
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
          <SheetContent side="left" className="w-72 p-0">
            <div className="h-full">
              {renderSidebarContent()}
            </div>
          </SheetContent>
        </Sheet>

        {/* Quick Links Modal */}
        <QuickLinksModal
          isOpen={isQuickLinksOpen}
          onClose={() => setIsQuickLinksOpen(false)}
        />
      </>
    );
  }

  // For desktop, render a collapsible sidebar
  return (
    <>
      <aside
        className="h-screen w-full overflow-hidden"
        aria-label="Sidebar navigation"
      >
        {renderSidebarContent()}
      </aside>

      {/* Quick Links Modal */}
      <QuickLinksModal
        isOpen={isQuickLinksOpen}
        onClose={() => setIsQuickLinksOpen(false)}
      />
    </>
  );
};

export default AppSidebar;
