import { z } from "zod";

export const tvShowImagesSchema = z.object({
  show_id: z.number(),
});
