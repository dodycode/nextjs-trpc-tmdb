import { z } from "zod";

export const searchHandlerSchema = z
  .object({
    query: z.string().nullable().optional(),
  })
  .optional();
