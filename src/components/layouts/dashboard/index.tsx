import { IUser } from "@/interfaces/user";
import BaseDashboardLayout from "./base";
import dashboardSideBarLinks from "@/constants/dashboard-sidebar";

interface LayoutDashboardProps {
  user: IUser;
  children?: React.ReactNode;
}

const LayoutDashboard: React.FC<LayoutDashboardProps> = ({
  user,
  children,
}) => {
  return (
    <BaseDashboardLayout user={user} links={dashboardSideBarLinks}>
      {children}
    </BaseDashboardLayout>
  );
};

export default LayoutDashboard;
