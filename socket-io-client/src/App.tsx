import { useEffect, useState } from "react";
import User from "./components/User";
import "./App.css";
import { Socket, io } from "socket.io-client";
// import SocketHook from './hooks/SocketHook'

const URL = "http://127.0.0.1:3000";
function App() {
  const [chat, setChat] = useState<string>("");

  useEffect(() => {
    const socket: Socket<any, any> = io(URL, {
      autoConnect: false,
      transports: ["websocket"],
    });
    socket.connect();

    function onConnect() {
      console.log("connected");
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

  return (
    <>
      <h1>Socket IO kitchen sink</h1>
      <div className="main">
        <div className="command">
          <h2>Command</h2>
          <div className="bordered" style={{ marginBottom: "10px" }}>
            <button>Add New User</button>
          </div>
          <div className="bordered" style={{ marginBottom: "10px" }}>
            <input
              placeholder="message"
              type="text"
              value={chat}
              onChange={(e) => setChat(e.target.value)}
            />
            <button>Broadcast</button>
          </div>
        </div>
        <div className="users">
          <h2>Users</h2>
          <div className="users-grid">
            <User socketId="abcdefg" message="" />
            <User socketId="abcdefg" message="" />
            <User socketId="abcdefg" message="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
