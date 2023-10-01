import axios from "axios";

const clientApi = axios.create({
  baseURL: new URL("/api", process.env.NEXT_PUBLIC_APP_API_URL).toString(),
});

export default clientApi;
