import clientApi from "@/lib/api";
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios";

type Response = {
  "total": number,
  "totalSolved": number,
  "totalUnsolved": number
}

const useGetIssuesStatistics = (appId: number) => {
  return useQuery<Response, AxiosError<{ message: string }>>({
    queryKey: ["statistics"],
    queryFn: async () => {
      const response = await clientApi({
        url: `/apps/${appId}/issues/statistics`,
      });

      return response.data;
    }
  })
}

export default useGetIssuesStatistics
