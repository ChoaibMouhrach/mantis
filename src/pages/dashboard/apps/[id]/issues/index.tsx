import DataTable from "@/components/data-table";
import LayoutAppDashboard from "@/components/layouts/dashboard/app";
import DashboardCard, {
  DashboardCardContent,
} from "@/components/shared/dashboard-card";
import { Button } from "@/components/ui/button";
import useGetIssues from "@/hooks/use-get-issues";
import { IIssue } from "@/interfaces/issue";
import { IUser } from "@/interfaces/user";
import withAuth from "@/middlewares/with-auth";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { MoreHorizontal, Plus } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardCardSkeleton from "@/components/shared/dashboard-skeleton";
import { Badge } from "@/components/ui/badge";

type Columns = (id: number) => ColumnDef<IIssue>[];

const issuesColumns: Columns = (id) => [
  {
    header: "Id",
    accessorKey: "id",
  },
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Category",
    accessorKey: "category.value",
  },
  {
    header: "Created At",
    cell: ({ row: { original } }) => moment(original.created_at).fromNow(),
  },
  {
    header: "Solved",
    cell: ({ row: { original } }) => original.solved ? <Badge>Closed</Badge> : <Badge variant="destructive" >Open</Badge>,
  },
  {
    id: "Actions",
    cell: ({ row: { original } }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="outline">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/apps/${id}/issues/${original.id}`}>
              Edit
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

interface IssueProps {
  user: IUser;
  id: number;
}

const Issue: React.FC<IssueProps> = ({ user, id }) => {
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 8,
  });
  const {
    data: issues,
    isSuccess,
    isFetching,
    isLoading,
    refetch,
  } = useGetIssues({
    appId: id,
    page: pagination.pageIndex + 1,
    search,
  });

  const columns = useMemo(() => issuesColumns(id), [id]);

  return (
    <LayoutAppDashboard user={user} id={id}>
      {isLoading && <DashboardCardSkeleton />}
      {isSuccess && (
        <DashboardCard
          title="Issues"
          description="You can manage your issues from here."
        >
          <DashboardCardContent>
            <DataTable<IIssue>
              columns={columns}
              data={issues?.data ?? []}
              handleSearch={setSearch}
              refetch={refetch}
              isFetching={isFetching}
              pagination={pagination}
              setPagination={setPagination}
              pageCount={issues.last_page}
            >
              <Button asChild variant="outline">
                <Link href={`/dashboard/apps/${id}/issues/create`}>
                  <Plus className="w-4 h-4" />
                  New Issue
                </Link>
              </Button>
            </DataTable>
          </DashboardCardContent>
        </DashboardCard>
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

export default Issue;
