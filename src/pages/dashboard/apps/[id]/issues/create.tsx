import LayoutAppDashboard from "@/components/layouts/dashboard/app";
import DashboardCard, {
  DashboardCardContent,
  DashboardCardFooter,
} from "@/components/shared/dashboard-card";
import DashboardCardSkeleton from "@/components/shared/dashboard-skeleton";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combobox";
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
import useCreateIssue, {
  CreateIssuePayload,
  createIssueSchema,
} from "@/hooks/use-create-issue";
import useGetCategories from "@/hooks/use-get-categories";
import { ICategory } from "@/interfaces/category";
import { IUser } from "@/interfaces/user";
import { debounce } from "@/lib/utils";
import withAuth from "@/middlewares/with-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CreateFormProps {
  id: number;
  categories: ICategory[];
  changeSearch: (value: string) => void;
}

const CreateForm: React.FC<CreateFormProps> = ({
  id,
  categories,
  changeSearch,
}) => {
  const { mutate: createIssue, isLoading } = useCreateIssue();

  const form = useForm<CreateIssuePayload>({
    resolver: zodResolver(createIssueSchema),
    values: {
      appId: Number(id),
      title: "",
      description: "",
      labels: [] as never,
      category_id: "",
    },
  });

  const onSubmit = (data: CreateIssuePayload) => {
    createIssue(data, {
      onSuccess: () => {
        toast.success("Issue created successfully.");
        form.reset();
      },
      onError: (err) => {
        toast.error(err.response?.data.message || "Something went wrong.");
      },
    });
  };

  return (
    <DashboardCard
      title="New Issue"
      description="You can create new issue from here."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DashboardCardContent className="flex flex-col gap-6">
            <FormField
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Can't download the..." />
                  </FormControl>
                  <FormDescription>The title of the issue.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <ComboBox
                    onLabelChange={changeSearch}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    items={categories.map((category) => ({
                      label: category.value,
                      value: String(category.id),
                    }))}
                  />
                  <FormDescription>The category of the issue.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="labels"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Labels</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value?.join(",")}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value
                            .split(",")
                            .map((label) => label.trim())
                            .filter((v) => v),
                        )
                      }
                      placeholder="bug, download, ..."
                    />
                  </FormControl>
                  <FormDescription>Commaseperated labels.</FormDescription>
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
                      rows={10}
                      {...field}
                      placeholder="While tring to download the software I..."
                    />
                  </FormControl>
                  <FormDescription>
                    The description of the issue.
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
  );
};

interface CreateProps {
  user: IUser;
  id: number;
}

const Create: React.FC<CreateProps> = ({ user, id }) => {
  const [search, setSearch] = useState<string>("");
  const {
    data: categories,
    isSuccess,
    isLoading,
  } = useGetCategories({ page: 1, search });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeSearch = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }),
    [setSearch],
  );

  return (
    <LayoutAppDashboard user={user} id={id}>
      {isLoading && <DashboardCardSkeleton />}
      {isSuccess && (
        <CreateForm
          id={id}
          categories={categories.data}
          changeSearch={changeSearch}
        />
      )}
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
export default Create;
