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
import useCreateCategory, {
  CreateCategoryPayload,
  createCategorySchema,
} from "@/hooks/use-create-category";
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
  const { mutate: createCategory, isLoading } = useCreateCategory();

  const form = useForm<CreateCategoryPayload>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      value: "",
    },
  });

  const onSubmit = (data: CreateCategoryPayload) => {
    createCategory(data, {
      onSuccess: () => {
        toast.success("Category created successfully.");
        form.reset();
      },
      onError: (err) => {
        toast.error(err.response?.data.message || "Category creation failed.");
      },
    });
  };

  return (
    <LayoutDashboard user={user}>
      <DashboardCard title="Create" description="You can create from here.">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DashboardCardContent>
              <FormField
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Category" />
                    </FormControl>
                    <FormDescription>Category is required.</FormDescription>
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
