import clientApi from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignInPayload = z.infer<typeof signInSchema>;
type SignInResponseError = AxiosError<{
  message: string;
}>;

const useSignIn = () => {
  return useMutation<AxiosResponse, SignInResponseError, SignInPayload>({
    mutationFn: async (data) => {
      return clientApi({
        url: "/auth/sign-in",
        method: "post",
        data,
      });
    },
  });
};

export default useSignIn;
