import clientApi from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { z } from "zod";

export const updateIssueSchema = z.object({
  issueId: z.number().positive().int(),
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

export type UpdateIssuePayload = z.infer<typeof updateIssueSchema>;

const useUpdateIssue = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<{ message: string }>,
    UpdateIssuePayload
  >({
    mutationFn: async ({ appId, issueId, ...data }) => {
      const response = await clientApi({
        url: `/apps/${appId}/issues/${issueId}`,
        method: "patch",
        data,
      });

      return response.data;
    },
  });
};

export default useUpdateIssue;
