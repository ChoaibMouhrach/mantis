import DataTable from "@/components/data-table";
import LayoutDashboard from "@/components/layouts/dashboard";
import DashboardCard, {
  DashboardCardContent,
} from "@/components/shared/dashboard-card";
import { Button } from "@/components/ui/button";
import useGetApps from "@/hooks/use-get-apps";
import { IApp } from "@/interfaces/app";
import { IUser } from "@/interfaces/user";
import withAuth from "@/middlewares/with-auth";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { MoreHorizontal, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import moment from "moment";
import DashboardCardSkeleton from "@/components/shared/dashboard-skeleton";

const columns: ColumnDef<IApp>[] = [
  {
    header: "Id",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Created At",
    cell: ({ row: { original } }) => moment(original.created_at).fromNow(),
  },
  {
    id: "Actions",
    cell: ({ row: { original } }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/apps/${original.id}`}>Visit</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

interface AppsProps {
  user: IUser;
}

const Apps: React.FC<AppsProps> = ({ user }) => {
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: apps,
    isSuccess,
    isLoading,
    refetch,
    isFetching,
  } = useGetApps({
    page: pagination.pageIndex + 1,
    search,
  });

  return (
    <LayoutDashboard user={user}>
      {isLoading && <DashboardCardSkeleton />}
      {isSuccess && (
        <DashboardCard
          title="Apps"
          description="You can manage your apps from here."
        >
          <DashboardCardContent>
            <DataTable<IApp>
              columns={columns}
              data={apps?.data ?? []}
              handleSearch={setSearch}
              refetch={refetch}
              isFetching={isFetching}
              pagination={pagination}
              setPagination={setPagination}
              pageCount={apps.last_page}
            >
              <Button variant="outline" asChild>
                <Link href="/dashboard/apps/create">
                  <Plus className="w-4 h-4" />
                  New App
                </Link>
              </Button>
            </DataTable>
          </DashboardCardContent>
        </DashboardCard>
      )}
    </LayoutDashboard>
  );
};

export const getServerSideProps = withAuth();
export default Apps;
