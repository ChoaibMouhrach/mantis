import env from "@/lib/env";
import axios from "axios";
import { GetServerSideProps } from "next";

const withAuth = (): GetServerSideProps => {
  return async (ctx) => {
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

      return {
        props: {
          user: response.data,
        },
      };
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
