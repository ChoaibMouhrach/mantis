import { IApp } from "@/interfaces/app";
import clientApi from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useGetApp = (id: number) => {
  return useQuery<IApp, AxiosError>({
    queryKey: ["apps"],
    queryFn: async () => {
      const response = await clientApi({
        url: `/apps/${id}`,
      });

      return response.data;
    },
  });
};

export default useGetApp;
