import env from "@/lib/env";
import axios, { AxiosError } from "axios";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method?.toLowerCase() !== "post") {
    return res.status(405).end();
  }

  const path = req.query.path as string;
  const token = req.cookies.auth;

  try {
    const response = await axios({
      url: new URL(path, new URL("/api/", env.API_URL).toString()).toString(),
      method: "POST",
      data: req.body,
      headers: {
        ...req.headers,
        authorization: token ? `Bearer ${token}` : undefined,
      },
    });

    if (response.headers["set-cookie"]) {
      res.setHeader("Set-Cookie", response.headers["set-cookie"]);
    }

    return res.status(response.status).json(response.data);
  } catch (err) {
    if (!(err instanceof AxiosError)) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    return res
      .status(err.response?.status || 500)
      .json({ message: err.response?.data.message || "Internal Server Error" });
  }
};

export default handler;
