import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import User from "./components/User";
import "./App.css";
import { API_URL } from "./constants";

function App() {
  const [chatBroadcast, setChatBroadcast] = useState<string>("");
  const [users, setUsers] = useState<{ key: string }[]>([]);

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
