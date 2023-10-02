import DataTable from "@/components/data-table";
import LayoutDashboard from "@/components/layouts/dashboard";
import DashboardCard, {
  DashboardCardContent,
} from "@/components/shared/dashboard-card";
import useGetCategories from "@/hooks/use-get-categories";
import { ICategory } from "@/interfaces/category";
import { IUser } from "@/interfaces/user";
import withAuth from "@/middlewares/with-auth";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import moment from "moment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from "lucide-react";
import Link from "next/link";
import DashboardCardSkeleton from "@/components/shared/dashboard-skeleton";

const columns: ColumnDef<ICategory>[] = [
  {
    header: "Id",
    accessorKey: "id",
  },
  {
    header: "Category",
    accessorKey: "value",
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
            <Link href={`/dashboard/categories/${original.id}/edit`}>Edit</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

interface CategoriesProps {
  user: IUser;
}

const Categories: React.FC<CategoriesProps> = ({ user }) => {
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });

  const {
    data: categories,
    isLoading,
    refetch,
    isFetching,
    isSuccess,
  } = useGetCategories({
    page: pagination.pageIndex + 1,
    search,
  });

  return (
    <LayoutDashboard user={user}>
      {isLoading && <DashboardCardSkeleton />}
      {isSuccess && (
        <DashboardCard
          title="Categories"
          description="You can manage your categories from here."
        >
          <DashboardCardContent>
            <DataTable<ICategory>
              columns={columns}
              data={categories.data}
              handleSearch={setSearch}
              refetch={refetch}
              isFetching={isFetching}
              pagination={pagination}
              setPagination={setPagination}
              pageCount={categories.last_page}
            >
              <Button asChild variant="outline">
                <Link href="/dashboard/categories/create">
                  <Plus className="w-4 h-4" />
                  New Category
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
export default Categories;
