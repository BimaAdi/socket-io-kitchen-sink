import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import User from "./components/User";
import "./App.css";

function App() {
  const [chat, setChat] = useState<string>("");
  const [users, setUsers] = useState<{ key: string }[]>([]);

  const addNewUser = () => {
    setUsers([...users, { key: uuidv4() }]);
  };

  const removeUser = (key: string) => {
    setUsers(users.filter((x) => key !== x.key));
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
              value={chat}
              onChange={(e) => setChat(e.target.value)}
            />
            <button>Broadcast</button>
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
