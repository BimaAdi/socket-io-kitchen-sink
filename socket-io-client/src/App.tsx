import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import User from "./components/User";
import "./App.css";
import AddUser from "./components/AddUser";
import SendMessageRest from "./components/SendMessageRest";

function App() {
  const [users, setUsers] = useState<{ key: string; room: string }[]>([]);

  const addNewUser = () => {
    setUsers([...users, { key: uuidv4(), room: "" }]);
  };

  const addNewUserToRoom = (room: string) => {
    setUsers([...users, { key: uuidv4(), room: room }]);
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
          <AddUser addNewUser={addNewUser} addNewUserToRoom={addNewUserToRoom}/>
          <hr />
          <SendMessageRest />
          <hr />
        </div>
        <div className="users">
          <h2>Users</h2>
          <div className="users-grid">
            {users.map((x) => {
              return (
                <User
                  id={x.key}
                  room={x.room}
                  removeUser={removeUser}
                  key={x.key}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
