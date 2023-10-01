import { Button } from "@/components/ui/button";
import useSignOut from "@/hooks/use-sign-out";
import withAuth from "@/middlewares/with-auth";
import { useRouter } from "next/router";
import { toast } from "sonner";

const Dashboard: React.FC = () => {
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
    <Button onClick={handleSignOut} isLoading={isLoading}>
      Sign Out
    </Button>
  );
};

export const getServerSideProps = withAuth();
export default Dashboard;
