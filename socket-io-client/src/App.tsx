import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import User from "./components/User";
import "./App.css";
import { API_URL } from "./constants";

function App() {
  const [users, setUsers] = useState<{ key: string }[]>([]);
  const [chatBroadcast, setChatBroadcast] = useState<string>("");
  const [inputSocketId, setInputSocketId] = useState<string>("");
  const [chatSocketId, setChatSocketId] = useState<string>("");

  const addNewUser = () => {
    setUsers([...users, { key: uuidv4() }]);
  };

  const removeUser = (key: string) => {
    setUsers(users.filter((x) => key !== x.key));
  };

  const broadcastMessage = async (message: string) => {
    const res = await fetch(`${API_URL}/api/broadcast/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });

    console.log(res.json());
  };

  const toSocketIdMessage = async (socket_id: string, message: string) => {
    const res = await fetch(`${API_URL}/api/to-socket-id/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        socket_id,
        message,
      }),
    });

    console.log(res.json());
  };

  return (
    <>
      <h1>Socket IO kitchen sink</h1>
      <div className="main">
        <div className="command">
          <h2>Command</h2>
          <div className="bordered" style={{ marginBottom: "10px" }}>
            <button onClick={addNewUser}>Add New User</button>
          </div>
          <div className="bordered" style={{ marginBottom: "10px" }}>
            <input
              placeholder="message"
              type="text"
              value={chatBroadcast}
              onChange={(e) => setChatBroadcast(e.target.value)}
            />
            <button onClick={() => broadcastMessage(chatBroadcast)}>
              Broadcast
            </button>
          </div>
          <div className="bordered" style={{ marginBottom: "10px" }}>
            <input
              placeholder="message"
              type="text"
              value={chatSocketId}
              onChange={(e) => setChatSocketId(e.target.value)}
            />
            <input
              placeholder="socketId"
              type="text"
              value={inputSocketId}
              onChange={(e) => setInputSocketId(e.target.value)}
            />
            <button onClick={() => toSocketIdMessage(inputSocketId, chatSocketId)}>
              toSocketId
            </button>
          </div>
        </div>
        <div className="users">
          <h2>Users</h2>
          <div className="users-grid">
            {users.map((x) => {
              return <User id={x.key} removeUser={removeUser} key={x.key} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
