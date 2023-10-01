import clientApi from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
    name: z.string().min(3),
  })
  .refine(
    ({ password, password_confirmation }) => password === password_confirmation,
    {
      message: "Password and Password Confirmation does not match",
      path: ["password_confirmation"],
    },
  );

export type SignUpPayload = z.infer<typeof signUpSchema>;
type SignUpResponseError = AxiosError<{
  message: string;
}>;

const useSignUp = () => {
  return useMutation<AxiosResponse, SignUpResponseError, SignUpPayload>({
    mutationFn: async (data) => {
      return clientApi({
        url: "/auth/sign-up",
        method: "post",
        data,
      });
    },
  });
};

export default useSignUp;
