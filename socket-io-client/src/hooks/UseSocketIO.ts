import { useEffect, useState, useRef } from "react";
import { Socket, io } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../types/socketio";
import { API_URL } from "../constants";

const UseSocketIO = ({
  autoConnect = true,
  room = "",
}: {
  autoConnect?: boolean | undefined;
  room?: string;
}) => {
  const [isConnect, setIsConnect] = useState<boolean>(false);
  const [socketId, setSocketId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const socket = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  useEffect(() => {
    socket.current = io(API_URL, {
      autoConnect: false,
    });
    if (autoConnect === true) {
      socket.current.connect();
    }

    function onConnect() {
      console.log("connected");
      setIsConnect(true);

      if (room !== "") {
        socket.current?.emit("joinRomm", room);
      }
    }

    function onDisconnect() {
      setIsConnect(false);
      setSocketId("");
    }

    function onSocketId(a: string) {
      setSocketId(a);
    }

    function onMessage(message: string) {
      setMessage(message);
    }

    socket.current.on("connect", onConnect);
    socket.current.on("disconnect", onDisconnect);
    socket.current.on("socketid", onSocketId);
    socket.current.on("message", onMessage);

    return () => {
      if (socket.current !== null) {
        socket.current.off("connect", onConnect);
        socket.current.off("disconnect", onDisconnect);
        socket.current.off("socketid", onSocketId);
        socket.current.off("message", onMessage);
      }
    };
  }, [autoConnect, room]);

  return { isConnect, socketId, socket, message };
};

export default UseSocketIO;
