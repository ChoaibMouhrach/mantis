import { IIssue } from "@/interfaces/issue";
import { Pagination } from "@/interfaces/pagination";
import clientApi from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface UseGetIssues {
  appId: number;
  page: number;
  search: string;
}

const useGetIssues = ({ appId, page, search }: UseGetIssues) => {
  return useQuery<Pagination<IIssue>>({
    queryKey: ["issues", page, search],
    queryFn: async () => {
      const response = await clientApi({
        url: `/apps/${appId}/issues?page=${page}&search=${search}`,
      });

      return response.data;
    },
    keepPreviousData: true,
  });
};

export default useGetIssues;
