import clientApi from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

const useDeleteApp = () => {
  return useMutation<AxiosResponse, AxiosError<{ message: string }>, number>({
    mutationFn: async (id) => {
      const response = await clientApi({
        url: `/apps/${id}`,
        method: "delete",
      });

      return response.data;
    },
  });
};

export default useDeleteApp;
