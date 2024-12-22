import { z } from "zod";

export const tvShowDetailsSchema = z.object({
  show_id: z.number(),
});
