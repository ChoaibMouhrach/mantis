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
import useDeleteIssue from "@/hooks/use-delete-issue";
import useGetCategories from "@/hooks/use-get-categories";
import useGetIssue from "@/hooks/use-get-issue";
import useUpdateIssue, {
  UpdateIssuePayload,
  updateIssueSchema,
} from "@/hooks/use-update-issue";
import { ICategory } from "@/interfaces/category";
import { IIssue } from "@/interfaces/issue";
import { IUser } from "@/interfaces/user";
import { debounce } from "@/lib/utils";
import withAuth from "@/middlewares/with-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface DeleteIssueProps {
  id: number;
  issueId: number;
}

const DeleteIssue: React.FC<DeleteIssueProps> = ({ id, issueId }) => {
  const route = useRouter();
  const { mutate: deleteIssue, isLoading } = useDeleteIssue();

  const handleClick = () => {
    deleteIssue(
      {
        appId: id,
        issueId,
      },
      {
        onSuccess: () => {
          toast.success("Issue deleted successfully.");
          route.push(`/dashboard/apps/${id}/issues`);
        },
        onError: (err) => {
          toast.error(err.response?.data.message || "Something went wrong.");
        },
      }
    );
  };

  return (
    <DashboardCard
      title="Delete"
      description="You can delete the issue from here."
    >
      <DashboardCardFooter>
        <Button
          isLoading={isLoading}
          variant="destructive"
          onClick={handleClick}
        >
          {!isLoading && <Save className="w-4 h-4" />}
          Delete
        </Button>
      </DashboardCardFooter>
    </DashboardCard>
  );
};

interface EditFormProps {
  issue: IIssue;
  categories: ICategory[];
  changeSearch: (value: string) => void;
}

const EditForm: React.FC<EditFormProps> = ({ changeSearch, issue, categories }) => {
  const { mutate: updateIssue, isLoading } = useUpdateIssue();

  const form = useForm<UpdateIssuePayload>({
    resolver: zodResolver(updateIssueSchema),
    values: {
      issueId: issue.id,
      appId: issue.app_id,
      title: issue.title,
      description: issue.description ?? undefined,
      labels: issue.labels?.map((label) => label.value) as never,
      category_id: String(issue.category_id),
    },
  });

  const onSubmit = (data: UpdateIssuePayload) => {
    updateIssue(data, {
      onSuccess: () => {
        toast.success("Issue updated successfully.");
      },
      onError: (err) => {
        toast.error(err.response?.data.message || "Something went wrong.");
      },
    });
  };

  return (
    <DashboardCard
      title="Issues"
      description="You can manage your app issue from here."
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
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    onLabelChange={changeSearch}
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
                            .filter((v) => v)
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
  issueId: number;
}

const Edit = ({ user, id, issueId }: EditProps) => {
  const { data: issue, isSuccess, isLoading } = useGetIssue(id, issueId);
  const [search, setSearch] = useState<string>("");
  const {
    data: categories,
    isSuccess: isCategoriesSuccess,
    isLoading: isCategoriesLoading,
  } = useGetCategories({ page: 1, search });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeSearch = useCallback(
    debounce((v: string) => setSearch(v)),
    []
  );

  return (
    <LayoutAppDashboard user={user} id={id}>
      <DeleteIssue id={id} issueId={issueId} />
      {(isLoading || isCategoriesLoading) && <DashboardCardSkeleton />}
      {isSuccess && isCategoriesSuccess && (
        <EditForm
          issue={issue}
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
      id: ctx.query.id,
      user: ctx.user,
      issueId: ctx.query.issueId,
    },
  };
});

export default Edit;
