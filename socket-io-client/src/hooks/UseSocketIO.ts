import { useEffect, useState, useRef } from "react";
import { Socket, io } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../types/socketio";

const URL = "http://localhost:3000";
const UseSocketIO = ({
  autoConnect = true,
}: {
  autoConnect?: boolean | undefined;
}) => {
  const [isConnect, setIsConnect] = useState<boolean>(false);
  const [socketId, setSocketId] = useState<string>("");
  const socket = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  useEffect(() => {
    socket.current = io(URL, {
      autoConnect: false,
    });
    if (autoConnect === true) {
      socket.current.connect();
    }

    function onConnect() {
      console.log("connected");
      setIsConnect(true);
    }

    function onDisconnect() {
      console.log("disconected");
    }

    function onSocketId(a: string) {
      setSocketId(a);
    }

    socket.current.on("connect", onConnect);
    socket.current.on("disconnect", onDisconnect);
    socket.current.on("socketid", onSocketId);

    return () => {
      if (socket.current !== null) {
        socket.current.off("connect", onConnect);
        socket.current.off("disconnect", onDisconnect);
        socket.current.off("socketid", onSocketId);
      }
    };
  }, [autoConnect]);

  return { isConnect, socketId, socket };
};

export default UseSocketIO;
