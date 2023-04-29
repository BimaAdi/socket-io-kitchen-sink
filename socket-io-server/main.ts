import express, { Express, Request, Response } from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from "./types/socketio";
import { BroadcastMessageValidator } from "./validators";

const app: Express = express();
const server = http.createServer(app);

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.set("io", io);

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(bodyParser.json());

app.get("/api/", (req: Request, res: Response) => {
  res.send("Hello");
});

app.post("/api/broadcast/", (req: Request, res: Response) => {
  let io = req.app.get("io") as Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >;

  try {
    const validate = BroadcastMessageValidator.safeParse(req.body);
    if (validate.success === false) {
      return res.status(400).json({ message: validate.error });
    }
    io.local.emit("message", validate.data.message);
    return res.status(200).json({ message: "Ok" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

io.on("connection", (socket) => {
  console.log(`a user connected with socket id ${socket.id}`);
  socket.emit("socketid", socket.id);
  socket.on("joinRoom", (room: string) => {
    console.log(`user ${socket.id} join room ${room}`);
    socket.join(room);
  });
});

server.listen(3000, () => {
  console.log(`[server]: Server is running at http://localhost:${3000}`);
});
