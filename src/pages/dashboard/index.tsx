import LayoutDashboard from "@/components/layouts/dashboard";
import { IUser } from "@/interfaces/user";
import withAuth from "@/middlewares/with-auth";

interface DashboardProps {
  user: IUser;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return <LayoutDashboard user={user}></LayoutDashboard>;
};

export const getServerSideProps = withAuth();
export default Dashboard;
