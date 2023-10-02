import LayoutAppDashboard from "@/components/layouts/dashboard/app";
import DashboardCard, {
  DashboardCardContent,
  DashboardCardFooter,
} from "@/components/shared/dashboard-card";
import DashboardCardSkeleton from "@/components/shared/dashboard-skeleton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useDeleteApp from "@/hooks/use-delete-app";
import useGetApp from "@/hooks/use-get-app";
import useUpdateApp, {
  UpdateAppPayload,
  updateAppSchema,
} from "@/hooks/use-update-app";
import { IApp } from "@/interfaces/app";
import { IUser } from "@/interfaces/user";
import withAuth from "@/middlewares/with-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Save } from "lucide-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface DeleteAppProps {
  id: number;
}

const DeleteApp: React.FC<DeleteAppProps> = ({ id }) => {
  const router = useRouter();

  const { mutate: deleteApp, isLoading } = useDeleteApp();

  const handleDeleteApp = () => {
    deleteApp(id, {
      onSuccess: () => {
        toast.success("App deleted successfully.");
        router.push("/dashboard/apps");
      },
      onError: (err) => {
        toast.error(err.response?.data.message || "App deletion failed.");
      },
    });
  };

  return (
    <DashboardCard
      title="Delete"
      description="You can delete your app from here."
    >
      <DashboardCardFooter>
        <Button
          isLoading={isLoading}
          variant="destructive"
          onClick={handleDeleteApp}
        >
          {!isLoading && <AlertTriangle className="w-4 h-4" />}
          Delete
        </Button>
      </DashboardCardFooter>
    </DashboardCard>
  );
};

interface UpdateAppProps {
  app: IApp;
}

const UpdateApp: React.FC<UpdateAppProps> = ({ app }) => {
  const { mutate: updateApp, isLoading } = useUpdateApp();

  const form = useForm<UpdateAppPayload>({
    resolver: zodResolver(updateAppSchema),
    values: {
      id: app.id,
      name: app.name,
      description: app.description ?? "",
    },
  });

  const onSubmit = (data: UpdateAppPayload) => {
    updateApp(data, {
      onSuccess: () => {
        toast.success("App updated successfully.");
      },
      onError: () => {
        toast.error("App update failed.");
      },
    });
  };

  return (
    <DashboardCard
      title="Update Settings"
      description="You can update your app from here."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DashboardCardContent className="flex flex-col gap-6">
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="YeraPos" />
                  </FormControl>
                  <FormDescription>The name of your app.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea cols={8} {...field} placeholder="YeraPos" />
                  </FormControl>
                  <FormDescription>
                    The description of your app.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </DashboardCardContent>

          <DashboardCardFooter>
            <Button isLoading={isLoading}>
              {!isLoading && <Save className="w-4 h-4" />}
              Save
            </Button>
          </DashboardCardFooter>
        </form>
      </Form>
    </DashboardCard>
  );
};

interface DashboardSettingsProps {
  user: IUser;
  id: number;
}

const DashboardSettings: React.FC<DashboardSettingsProps> = ({ user, id }) => {
  const { data: app, isSuccess, isLoading } = useGetApp(id);

  return (
    <LayoutAppDashboard user={user} id={id}>
      <DeleteApp id={id} />
      {isLoading && <DashboardCardSkeleton />}
      {isSuccess && <UpdateApp app={app} />}
    </LayoutAppDashboard>
  );
};

export default DashboardSettings;
export const getServerSideProps = withAuth(async (ctx) => {
  return {
    props: {
      user: ctx.user,
      id: ctx.query.id,
    },
  };
});
