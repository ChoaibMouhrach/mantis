import { IIssue } from "@/interfaces/issue";
import clientApi from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetIssue = (id: number, issueId: number) => {
  return useQuery<IIssue>({
    queryKey: ["issues"],
    queryFn: async () => {
      const response = await clientApi({
        url: `/apps/${id}/issues/${issueId}`,
      });

      return response.data;
    },
  });
};

export default useGetIssue;
