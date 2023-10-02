import LayoutDashboard from "@/components/layouts/dashboard";
import DashboardCard, {
  DashboardCardFooter,
} from "@/components/shared/dashboard-card";
import { Button } from "@/components/ui/button";
import useSignOut from "@/hooks/use-sign-out";
import { IUser } from "@/interfaces/user";
import withAuth from "@/middlewares/with-auth";
import { useRouter } from "next/router";
import { toast } from "sonner";

interface SettingsProps {
  user: IUser;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const { mutate: signOut, isLoading } = useSignOut();
  const router = useRouter();

  async function handleSignOut() {
    signOut(undefined, {
      onSuccess: () => {
        toast.success("Sign Out Success");
        router.push("/");
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || "Sign Out Failed");
      },
    });
  }

  return (
    <LayoutDashboard user={user}>
      <DashboardCard title="Sign out" description="You can sign out from here.">
        <DashboardCardFooter>
          <Button
            onClick={handleSignOut}
            isLoading={isLoading}
            variant="destructive"
          >
            Sign Out
          </Button>
        </DashboardCardFooter>
      </DashboardCard>
    </LayoutDashboard>
  );
};

export const getServerSideProps = withAuth();
export default Settings;
