import LayoutAppDashboard from "@/components/layouts/dashboard/app";
import { IUser } from "@/interfaces/user";
import withAuth from "@/middlewares/with-auth";

interface AppProps {
  user: IUser;
  id: number;
}

const App: React.FC<AppProps> = ({ user, id }) => {
  return (
    <LayoutAppDashboard user={user} id={id}>
      Camado
    </LayoutAppDashboard>
  );
};

export const getServerSideProps = withAuth(async (ctx) => {
  return {
    props: {
      user: ctx.user,
      id: ctx.query.id,
    },
  };
});
export default App;
