import { z } from "zod";

export const tvShowVideosSchema = z.object({
  show_id: z.number(),
});
