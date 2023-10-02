import serverApi from "@/lib/server-api";
import { AxiosError } from "axios";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { paths, ...query } = req.query as { paths: string[] };
  const path = "/" + paths.join("/");
  const method = req.method?.toLowerCase();
  const token = req.cookies.auth;
  const queryParams = new URLSearchParams(query).toString();

  try {
    const response = await serverApi({
      url: `${path}?${queryParams}`,
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
