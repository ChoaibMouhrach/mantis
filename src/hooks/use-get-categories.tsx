import { ICategory } from "@/interfaces/category";
import { Pagination } from "@/interfaces/pagination";
import clientApi from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

type ResponseBody = Pagination<ICategory>;

interface UseGetCategoriesProps {
  page: number;
  search: string;
}

const useGetCategories = ({ page, search }: UseGetCategoriesProps) => {
  return useQuery<ResponseBody>({
    queryKey: ["categories", page, search],
    queryFn: async () => {
      const response = await clientApi({
        url: `/categories?page=${page}&search=${search}`,
      });

      return response.data;
    },
    keepPreviousData: true,
  });
};

export default useGetCategories;
