import { ICategory } from "@/interfaces/category";
import clientApi from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useGetCategory = (id: number) => {
  return useQuery<ICategory, AxiosError>({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await clientApi({
        url: `/categories/${id}`,
      });

      return response.data;
    },
  });
};

export default useGetCategory;
