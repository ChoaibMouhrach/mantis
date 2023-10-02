import { IApp } from "@/interfaces/app";
import { Pagination } from "@/interfaces/pagination";
import clientApi from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface UseGetAppsProps {
  page: number;
  search: string;
}

const useGetApps = ({ page, search }: UseGetAppsProps) => {
  return useQuery<Pagination<IApp>>({
    queryKey: ["apps", page, search],
    queryFn: async () => {
      const response = await clientApi({
        url: `/apps?page=${page}&search=${search}`,
      });

      return response.data;
    },
    keepPreviousData: true,
  });
};

export default useGetApps;
