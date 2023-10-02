import {
  AppWindow,
  Box,
  Bug,
  Home,
  LayoutDashboard,
  LucideIcon,
  Settings,
} from "lucide-react";

export interface DashboardSideBarLink {
  title: string;
  icon: LucideIcon;
  link: string;
}

const dashboardSideBarLinks: DashboardSideBarLink[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    link: "/dashboard",
  },
  {
    title: "Apps",
    icon: AppWindow,
    link: "/dashboard/apps",
  },
  {
    title: "Categories",
    icon: Box,
    link: "/dashboard/categories",
  },
  {
    title: "Settings",
    icon: Settings,
    link: "/dashboard/settings",
  },
];

export const appDashboardSideBarLinks: (
  id: number,
) => DashboardSideBarLink[] = (id) => [
  {
    title: "Home",
    icon: Home,
    link: `/dashboard/apps`,
  },
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    link: `/dashboard/apps/${id}`,
  },
  {
    title: "Issues",
    icon: Bug,
    link: `/dashboard/apps/${id}/issues`,
  },
  {
    title: "Settings",
    icon: Settings,
    link: `/dashboard/apps/${id}/settings`,
  },
];

export default dashboardSideBarLinks;
