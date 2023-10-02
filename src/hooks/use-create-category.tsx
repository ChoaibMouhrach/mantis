import clientApi from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { z } from "zod";

export const createCategorySchema = z.object({
  value: z.string().min(3).max(255),
});

export type CreateCategoryPayload = z.infer<typeof createCategorySchema>;

const useCreateCategory = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<{ message: string }>,
    CreateCategoryPayload
  >({
    mutationFn: async (data) => {
      const response = await clientApi({
        url: "/categories",
        method: "post",
        data,
      });

      return response.data;
    },
  });
};

export default useCreateCategory;
