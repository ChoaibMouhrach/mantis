import LayoutDashboard from "@/components/layouts/dashboard";
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
import useDeleteCategory from "@/hooks/use-delete-category";
import useGetCategory from "@/hooks/use-get-category";
import useUpdateCategory, {
  UpdateCategoryPayload,
  updateCategorySchema,
} from "@/hooks/use-update-category";
import { ICategory } from "@/interfaces/category";
import { IUser } from "@/interfaces/user";
import withAuth from "@/middlewares/with-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Save } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface DeleteCategoryProps {
  id: number;
}

const DeleteCategory: React.FC<DeleteCategoryProps> = ({ id }) => {
  const { mutate: deleteCategory, isLoading } = useDeleteCategory();
  const router = useRouter();

  const handleClick = () => {
    deleteCategory(id, {
      onSuccess: () => {
        toast.success("Category deleted successfully.");
        router.push("/dashboard/categories");
      },
      onError: (err) => {
        toast.error(err.response?.data.message || "Category deletion failed.");
      },
    });
  };

  return (
    <DashboardCard
      title="Delete"
      description="You can delete categories from here."
    >
      <DashboardCardFooter>
        <Button
          isLoading={isLoading}
          variant="destructive"
          onClick={handleClick}
        >
          {!isLoading && <AlertTriangle className="w-4 h-4" />}
          Delete
        </Button>
      </DashboardCardFooter>
    </DashboardCard>
  );
};

interface UpdateCategoryProps {
  category: ICategory;
}

const UpdateCategory: React.FC<UpdateCategoryProps> = ({ category }) => {
  const { mutate: updateCategory, isLoading } = useUpdateCategory();

  const form = useForm<UpdateCategoryPayload>({
    resolver: zodResolver(updateCategorySchema),
    values: {
      id: category.id,
      value: category.value,
    },
  });

  const onSubmit = (daya: UpdateCategoryPayload) => {
    updateCategory(daya, {
      onSuccess: () => {
        toast.success("Category updated successfully.");
      },
      onError: (err) => {
        toast.error(err.response?.data.message || "Category updation failed.");
      },
    });
  };

  return (
    <DashboardCard
      title="Edit"
      description="You can edit your category from here."
    >
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
                  <FormDescription>Enter a category.</FormDescription>
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

interface EditProps {
  user: IUser;
  id: number;
}

const Edit: React.FC<EditProps> = ({ id, user }) => {
  const { data: category, isLoading, isSuccess } = useGetCategory(id);

  return (
    <LayoutDashboard user={user}>
      <DeleteCategory id={id} />
      {isLoading && <DashboardCardSkeleton />}
      {isSuccess && <UpdateCategory category={category} />}
    </LayoutDashboard>
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
export default Edit;
