import express, { Express, Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from './types/socketio';

const app: Express = express();
const server = http.createServer(app)

const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});


app.get('/', (req: Request, res: Response) => {
    res.send("Hello")
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(3000, () => {
    console.log(`[server]: Server is running at http://localhost:${3000}`);
});
