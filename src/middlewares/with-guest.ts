import env from "@/lib/env";
import axios from "axios";
import { GetServerSideProps } from "next";

const withGuest = (): GetServerSideProps => {
  return async (ctx) => {
    const token = ctx.req.cookies.auth;

    if (!token) {
      return {
        props: {},
      };
    }

    try {
      await axios({
        url: new URL("/api/me", env.API_URL).toString(),
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      return {
        redirect: {
          destination: "/dashboard",
          permanent: true,
        },
      };
    } catch (err) {
      ctx.res.setHeader("Set-Cookie", `auth=; path=/; Max-Age=0`);
      return {
        props: {},
      };
    }
  };
};

export default withGuest;
