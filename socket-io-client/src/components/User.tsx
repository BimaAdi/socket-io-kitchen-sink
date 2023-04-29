import UseSocketIO from "../hooks/UseSocketIO";

const User = ({
  id,
  removeUser,
  room = "",
}: {
  id: string;
  removeUser: (key: string) => void;
  room?: string | undefined;
}) => {
  const { isConnect, socketId, socket, message } = UseSocketIO({
    autoConnect: true,
  });

  const removeAndDisconect = () => {
    socket.current?.disconnect();
    removeUser(id);
  };

  return (
    <div className="bordered">
      <div>status: {isConnect ? "connected" : "disconnected"}</div>
      <div>socket id: {socketId}</div>
      <div>room: {room ? room : ""}</div>
      <div>receive_message: {message}</div>
      <button onClick={removeAndDisconect}>X</button>
    </div>
  );
};

export default User;
