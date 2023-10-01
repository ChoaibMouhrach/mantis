import { z } from "zod";

const envSchema = z.object({
  API_URL: z.string().nonempty(),
});

export default envSchema.parse(process.env);
