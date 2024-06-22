import { z } from "zod";

export const reportSchema = z.object({
  tags: z.array(z.string()).min(1, "Select at least one tag"),
});
