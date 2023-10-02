import clientApi from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { z } from "zod";

export const updateAppSchema = z.object({
  id: z.number().positive().int(),
  name: z.string().min(3).max(255),
  description: z
    .string()
    .transform((v) => v || undefined)
    .optional()
    .refine(
      (v) =>
        v === undefined
          ? true
          : z.string().min(3).max(2550).safeParse(v).success,
      {
        message: "Description must be between 3 and 2550 characters",
      },
    ),
});

export type UpdateAppPayload = z.infer<typeof updateAppSchema>;

const useUpdateApp = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<{ message: string }>,
    UpdateAppPayload
  >({
    mutationFn: async ({ id, name, description }) => {
      const response = await clientApi({
        url: `/apps/${id}`,
        method: "PATCH",
        data: {
          name,
          description,
        },
      });

      return response.data;
    },
  });
};

export default useUpdateApp;
