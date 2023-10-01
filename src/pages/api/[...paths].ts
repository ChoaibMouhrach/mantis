import env from "@/lib/env";
import axios, { AxiosError } from "axios";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const path = req.query.path as string;
  const method = req.method?.toLowerCase();
  const url = new URL(path, new URL("/api", env.API_URL).toString()).toString();
  const token = req.cookies.auth;

  try {
    const response = await axios({
      url,
      method,
      data: req.body,
      headers: {
        authorization: token ? `Bearer ${token}` : undefined,
        ...req.headers,
      },
    });
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
