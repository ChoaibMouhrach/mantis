import LayoutAppDashboard from "@/components/layouts/dashboard/app";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useGetIssuesStatistics from "@/hooks/use-get-issues-statistics";
import { IUser } from "@/interfaces/user";
import withAuth from "@/middlewares/with-auth";

interface AppProps {
  user: IUser;
  id: number;
}

const App: React.FC<AppProps> = ({ user, id }) => {
  const {
    data: statistics,
    isLoading,
    isSuccess
  } = useGetIssuesStatistics(id);

  return (
    <LayoutAppDashboard user={user} id={id}>
      <div className="grid lg:grid-cols-3 gap-4" >
        {
          isLoading && (
            <>
              <Skeleton className="h-20 bg-white border" />
              <Skeleton className="h-20 bg-white border" />
              <Skeleton className="h-20 bg-white border" />
            </>
          )
        }
        {
          isSuccess && (
            [
              {
                name: "Total Issues",
                value: statistics.total,
              },
              {
                name: "Total Open Issues",
                value: statistics.totalUnsolved,
              },
              {
                name: "Total Closed Issues",
                value: statistics.totalSolved,
              },
            ].map((data) => (
              <Card key={data.name} >
                <CardHeader>
                  <CardTitle>
                    {
                      data.value
                    }
                  </CardTitle>
                  <CardDescription>
                    {
                      data.name
                    }
                  </CardDescription>
                </CardHeader>
              </Card>
            ))
          )
        }
      </div>
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
