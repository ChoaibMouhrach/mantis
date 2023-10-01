import clientApi from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

type SignOutResponseError = AxiosError<{
  message: string;
}>;

const useSignOut = () => {
  return useMutation<AxiosResponse, SignOutResponseError, void>({
    mutationFn: async (data) => {
      return clientApi({
        url: "/auth/sign-out",
        method: "post",
        data,
      });
    },
  });
};

export default useSignOut;
