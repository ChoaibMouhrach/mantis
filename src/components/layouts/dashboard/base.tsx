import dashboardSideBarLinks, {
  DashboardSideBarLink,
} from "@/constants/dashboard-sidebar";
import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUser } from "@/interfaces/user";
import Link from "next/link";

interface BaseDashboardLayoutProps {
  children: React.ReactNode;
  user: IUser;
  links: DashboardSideBarLink[];
}

const BaseDashboardLayout: React.FC<BaseDashboardLayoutProps> = ({
  user,
  children,
  links,
}) => {
  return (
    <main className="min-h-[100dvh] flex flex-col">
      <nav className="h-16 flex items-center justify-between px-4 fixed top-0 w-full border-b bg-background">
        <div className="flex items-center gap-2">
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-4 flex flex-col gap-4">
                <SheetHeader>
                  <SheetTitle className="text-start">Navigations</SheetTitle>
                </SheetHeader>
                <Separator />
                <div className="flex flex-col gap-2">
                  {links.map((link) => (
                    <Button
                      key={link.title}
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      asChild
                    >
                      <Link href={link.link}>
                        <link.icon className="w-4 h-4" />
                        {link.title}
                      </Link>
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <Logo />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="select-0 cursor-pointer">
              <AvatarFallback className="bg-primary text-background text-sm">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <div className="h-16" />
      <div className="flex items-stretch flex-1">
        <div className="w-80 shrink-0 hidden lg:block" />
        <div className="w-80 fixed left-0 h-full border-r p-4 flex-col gap-2 hidden lg:flex">
          {links.map((link) => (
            <Button
              key={link.title}
              variant="outline"
              size="sm"
              className="justify-start"
              asChild
            >
              <Link href={link.link}>
                <link.icon className="w-4 h-4" />
                {link.title}
              </Link>
            </Button>
          ))}
        </div>
        <div className="flex-1 bg-secondary p-4 flex flex-col gap-4 w-full">
          {children}
        </div>
      </div>
    </main>
  );
};

export default BaseDashboardLayout;
