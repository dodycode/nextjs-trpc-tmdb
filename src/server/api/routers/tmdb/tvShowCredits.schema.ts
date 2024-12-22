import { z } from "zod";

export const tvShowCreditsSchema = z.object({
  show_id: z.number(),
});
