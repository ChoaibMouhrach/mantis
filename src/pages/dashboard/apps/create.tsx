import LayoutDashboard from "@/components/layouts/dashboard";
import DashboardCard, {
  DashboardCardContent,
  DashboardCardFooter,
} from "@/components/shared/dashboard-card";
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
import useCreateApp, {
  CreateAppPayload,
  createAppSchema,
} from "@/hooks/use-create-app";
import { IUser } from "@/interfaces/user";
import withAuth from "@/middlewares/with-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CreateProps {
  user: IUser;
}

const Create: React.FC<CreateProps> = ({ user }) => {
  const { mutate: createApp, isLoading } = useCreateApp();

  const form = useForm<CreateAppPayload>({
    resolver: zodResolver(createAppSchema),
    values: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (data: CreateAppPayload) => {
    createApp(data, {
      onSuccess: () => {
        toast.success("App created successfully.");
        form.reset();
      },
      onError: (err) => {
        toast.error(err.response?.data.message || "App creation failed.");
      },
    });
  };

  return (
    <LayoutDashboard user={user}>
      <DashboardCard
        title="New App"
        description="You can create apps from here."
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
                      <Input {...field} placeholder="YeraPos..." />
                    </FormControl>
                    <FormDescription>
                      Enter a name for your app.
                    </FormDescription>
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
                      <Textarea
                        rows={8}
                        {...field}
                        placeholder="YeraPos an online point of sale solution..."
                      />
                    </FormControl>
                    <FormDescription>
                      Enter a description for your app.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </DashboardCardContent>
            <DashboardCardFooter>
              <Button isLoading={isLoading}>
                {!isLoading && <Plus className="w-4 h-4" />}
                Create
              </Button>
            </DashboardCardFooter>
          </form>
        </Form>
      </DashboardCard>
    </LayoutDashboard>
  );
};

export const getServerSideProps = withAuth();
export default Create;
