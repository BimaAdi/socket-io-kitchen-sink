import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const URL = "http://localhost:3000";
const UseSocketIO = () => {
  const [isConnect, setIsConnect] = useState<boolean>(false);

  useEffect(() => {
    const socket: Socket<any, any> = io(URL, {
      autoConnect: false,
    });
    socket.connect();

    function onConnect() {
      console.log("connected");
      setIsConnect(true);
    }

    function onDisconnect() {
      console.log("disconected");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return { isConnect };
};

export default UseSocketIO;
