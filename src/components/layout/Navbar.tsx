import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/ui/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EnhancedNotificationCenter from "@/components/notifications/EnhancedNotificationCenter";
import { Menu, PlayCircle } from "lucide-react";

interface NavbarProps {
  onMenuClick?: () => void;
}

const staticUser = {
  name: "Admin User",
  roleLabel: "Company Admin",
  avatar:
    "https://images.pexels.com/photos/3777948/pexels-photo-3777948.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2",
};

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const user = staticUser;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b transition-all duration-300 ${
          isScrolled
            ? "shadow-lg shadow-black/5 border-border/50"
            : "border-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onMenuClick}
                  className="mr-2 hover:bg-accent/50 transition-colors duration-200"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              <Link
                to="/"
                className="transition-transform duration-200 hover:scale-105"
              >
                <Logo size={isMobile ? "sm" : "md"} />
              </Link>
            </div>

            <div className="flex items-center space-x-3 md:space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsTutorialOpen(true)}
                className="text-primary hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-200 hover:shadow-md hover:shadow-primary/20"
                title="Watch Tutorial"
              >
                <PlayCircle className="h-5 w-5" />
                <span className="sr-only">Watch Tutorial</span>
              </Button>

              <EnhancedNotificationCenter />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 md:h-10 md:w-10 rounded-full hover:bg-accent/50 transition-all duration-200 hover:shadow-md"
                  >
                    <Avatar className="h-8 w-8 md:h-10 md:w-10 ring-2 ring-transparent hover:ring-primary/20 transition-all duration-200">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-foreground font-semibold">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div>
                      <p className="font-medium truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.roleLabel}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="w-full cursor-pointer">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      // Static demo: just navigate to login
                      window.location.href = "/login";
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <Dialog open={isTutorialOpen} onOpenChange={setIsTutorialOpen}>
        <DialogContent className="max-w-7xl w-[90vw]">
          <DialogHeader>
            <DialogTitle>How to Use QORE</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full h-[70vh] overflow-hidden rounded-md">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/SbmvnQRrXz0?si=tfD6wibxprtiacq7"
              title="QORE Tutorial Video"
              style={{ border: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full rounded-md"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
