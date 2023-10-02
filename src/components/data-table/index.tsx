import {
  SortingState,
  ColumnDef,
  flexRender,
  VisibilityState,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  PaginationState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTablePagination } from "./pagination";
import { RotateCw, Settings2 } from "lucide-react";
import { debounce } from "@/lib/utils";
import { useRouter } from "next/router";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  children?: React.ReactNode;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  pageCount: number;
  isFetching: boolean;
  refetch: () => void;
  // eslint-disable-next-line no-unused-vars
  handleSearch: (value: string) => void;
}

const DataTable = <TValue,>({
  pageCount,
  columns,
  pagination,
  setPagination,
  children,
  data,
  isFetching,
  refetch,
  handleSearch,
}: DataTableProps<TValue>) => {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    // data
    data,
    columns,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },

    // events
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,

    // options
    manualPagination: true,
    pageCount,

    // core
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearchChange = useCallback(
    debounce(async (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();
      await router.push(
        {
          query: {
            ...router.query,
            page: undefined,
            search: value,
          },
        },
        undefined,
        { shallow: true },
      );
      setPagination({ pageIndex: 0, pageSize: 10 });
      handleSearch(value);
    }),
    [router, router.query],
  );

  useEffect(() => {
    const page =
      typeof router.query.page === "string"
        ? parseInt(router.query.page) ?? 1
        : 1;

    if (page - 1 != pagination.pageIndex) {
      router.push(
        {
          query: {
            ...router.query,
            page: pagination.pageIndex + 1,
          },
        },
        undefined,
        { shallow: true },
      );
    }
  }, [pagination, router]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap-reverse justify-between gap-4 items-center">
        <Input
          placeholder="Search..."
          defaultValue={router.query.search}
          className="max-w-sm"
          onChange={onSearchChange}
        />
        <div className="flex items-center flex-wrap-reverse gap-4">
          {children}
          <Button
            size="icon"
            variant="outline"
            isLoading={isFetching}
            onClick={() => refetch()}
          >
            {!isFetching && <RotateCw className="w-4 h-4" />}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Settings2 className="w-4 h-4" />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="whitespace-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
};

export default DataTable;
