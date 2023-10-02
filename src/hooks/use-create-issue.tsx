import clientApi from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { z } from "zod";

export const createIssueSchema = z.object({
  appId: z.number().positive().int(),
  title: z.string().nonempty().max(255),
  labels: z.array(z.string().nonempty().max(255)).nonempty(),
  category_id: z.string().nonempty().max(255),
  description: z
    .string()
    .max(1000)
    .transform((v) => v || undefined)
    .optional()
    .refine(
      (v) =>
        v === undefined ? true : z.string().nonempty().safeParse(v).success,
      {
        message: "Description must be a valid string.",
      },
    ),
});

export type CreateIssuePayload = z.infer<typeof createIssueSchema>;

const useCreateIssue = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<{ message: string }>,
    CreateIssuePayload
  >({
    mutationFn: async ({ appId, title, description, labels, category_id }) => {
      const response = await clientApi({
        url: `/apps/${appId}/issues`,
        method: "POST",
        data: {
          title,
          description,
          labels,
          category_id,
        },
      });

      return response.data;
    },
  });
};

export default useCreateIssue;
