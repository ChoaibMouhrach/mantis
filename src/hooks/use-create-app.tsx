import clientApi from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { z } from "zod";

export const createAppSchema = z.object({
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

export type CreateAppPayload = z.infer<typeof createAppSchema>;

const useCreateApp = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<{ message: string }>,
    CreateAppPayload
  >({
    mutationFn: async (data) => {
      const response = await clientApi({
        url: "/apps",
        method: "post",
        data,
      });
      return response.data;
    },
  });
};

export default useCreateApp;
