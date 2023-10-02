import clientApi from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

const useDeleteIssue = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<{ message: string }>,
    { appId: number; issueId: number }
  >({
    mutationFn: async ({ appId, issueId }) => {
      const response = await clientApi({
        url: `/apps/${appId}/issues/${issueId}`,
        method: "DELETE",
      });

      return response.data;
    },
  });
};

export default useDeleteIssue;
