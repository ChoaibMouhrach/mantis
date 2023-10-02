import axios from "axios";
import env from "./env";

const serverApi = axios.create({
  baseURL: new URL("/api", env.API_URL).toString(),
});

export default serverApi;
