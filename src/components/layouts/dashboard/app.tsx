import { appDashboardSideBarLinks } from "@/constants/dashboard-sidebar";
import BaseDashboardLayout from "./base";
import { IUser } from "@/interfaces/user";
import { useMemo } from "react";

interface LayoutAppDashboardProps {
  children?: React.ReactNode;
  user: IUser;
  id: number;
}

const LayoutAppDashboard: React.FC<LayoutAppDashboardProps> = ({
  children,
  user,
  id,
}) => {
  const links = useMemo(() => appDashboardSideBarLinks(id), [id]);
  return (
    <BaseDashboardLayout user={user} links={links}>
      {children}
    </BaseDashboardLayout>
  );
};

export default LayoutAppDashboard;
