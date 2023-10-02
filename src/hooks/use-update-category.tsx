import clientApi from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { z } from "zod";

export const updateCategorySchema = z.object({
  id: z.number().positive().int(),
  value: z.string().min(3).max(255),
});

export type UpdateCategoryPayload = z.infer<typeof updateCategorySchema>;

const useUpdateCategory = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<{ message: string }>,
    UpdateCategoryPayload
  >({
    mutationFn: async ({ id, value }) => {
      const response = await clientApi({
        url: `/categories/${id}`,
        method: "patch",
        data: {
          value,
        },
      });

      return response.data;
    },
  });
};

export default useUpdateCategory;
