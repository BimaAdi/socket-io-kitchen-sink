import { useEffect } from "react";
import UseSocketIO from "../hooks/UseSocketIO";

const User = ({
  id,
  removeUser,
  room = undefined,
}: {
  id: string;
  removeUser: (key: string) => void;
  room?: string | undefined;
}) => {
  const { isConnect, socketId, socket } = UseSocketIO({ autoConnect: true });

  useEffect(() => {
    if (isConnect === true) {
      console.log(`connect to socketio`);
    } else {
      console.log(`try to connect socketio`);
    }
  }, [isConnect]);

  const removeAndDisconect = () => {
    socket.current?.disconnect();
    removeUser(id);
  };

  return (
    <div className="bordered">
      <div>socket id: {socketId}</div>
      <div>room: {room ? room : ""}</div>
      <div>receive_message: </div>
      <button onClick={removeAndDisconect}>X</button>
    </div>
  );
};

export default User;
