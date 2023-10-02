import { IUser } from "@/interfaces/user";
import env from "@/lib/env";
import axios from "axios";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

interface CustomGetServerSidePropsContext extends GetServerSidePropsContext {
  user?: IUser;
}

type CustomGetServerSideProps = (
  ctx: CustomGetServerSidePropsContext,
) => Promise<GetServerSidePropsResult<any>>;

const withAuth = (
  getServerSideProps?: CustomGetServerSideProps,
): GetServerSideProps => {
  return async (ctx: CustomGetServerSidePropsContext) => {
    const token = ctx.req.cookies.auth;

    if (!token) {
      return {
        redirect: {
          destination: "/sign-in",
          permanent: true,
        },
      };
    }

    try {
      const response = await axios({
        url: new URL("/api/me", env.API_URL).toString(),
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const user = response.data;

      if (!getServerSideProps) {
        return {
          props: {
            user,
          },
        };
      }

      ctx.user = user;

      return await getServerSideProps(ctx);
    } catch (err) {
      ctx.res.setHeader("Set-Cookie", `auth=; path=/; Max-Age: 0`);

      return {
        redirect: {
          destination: "/sign-in",
          permanent: true,
        },
      };
    }
  };
};

export default withAuth;
