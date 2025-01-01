import { z } from "zod";

export const PeopleHandlerSchema = z
  .object({
    cursor: z.number().optional().default(1),
  })
  .optional();
