import { z } from "zod";

export const BroadcastMessageValidator = z.object({
  message: z.string(),
});

export type BroadcastMessage = z.infer<typeof BroadcastMessageValidator>;
