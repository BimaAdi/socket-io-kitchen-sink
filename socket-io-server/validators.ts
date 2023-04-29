import { z } from "zod";

export const BroadcastMessageValidator = z.object({
  message: z.string(),
});

export type BroadcastMessage = z.infer<typeof BroadcastMessageValidator>;

export const ToSocketIdMessageValidator = z.object({
  socket_id: z.string(),
  message: z.string(),
});

export type ToSocketIdMessage = z.infer<typeof ToSocketIdMessageValidator>;
