import { z } from "zod";

export const paginationQuerySchema = z.object({
  offset: z.preprocess(
    (a) => (typeof a === "string" ? parseInt(a) : a),
    z.number().nonnegative().optional()
  ),
  limit: z.preprocess(
    (a) => (typeof a === "string" ? parseInt(a) : a),
    z.number().nonnegative().optional()
  ),
});
