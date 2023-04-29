import { useState } from "react";

const AddUser = ({
  addNewUser,
  addNewUserToRoom,
}: {
  addNewUser: () => void;
  addNewUserToRoom: (room: string) => void;
}) => {
  const [room, setRoom] = useState<string>("");
  return (
    <div className="bordered">
      <h3>Create User</h3>
      <div className="bordered" style={{ marginBottom: "10px" }}>
        <button onClick={addNewUser}>Add New User</button>
      </div>
      <div className="bordered" style={{ marginBottom: "10px" }}>
        <input
          placeholder="room"
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={() => addNewUserToRoom(room)}>
          Add New User to Room
        </button>
      </div>
    </div>
  );
};

export default AddUser;
