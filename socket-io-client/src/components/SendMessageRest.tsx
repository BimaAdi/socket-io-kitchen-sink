import { useState } from "react";
import { API_URL } from "../constants";

const SendMessageRest = () => {
  const [chatBroadcast, setChatBroadcast] = useState<string>("");
  const [inputSocketId, setInputSocketId] = useState<string>("");
  const [chatSocketId, setChatSocketId] = useState<string>("");
  const [inputRoom, setInputRoom] = useState<string>("");
  const [chatRoom, setChatRoom] = useState<string>("");

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

  const toRoomMessage = async (room: string, message: string) => {
    const res = await fetch(`${API_URL}/api/to-room/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        room,
        message,
      }),
    });

    console.log(res.json());
  };

  return (
    <div className="bordered">
      <h3>Send Message Throught REST api</h3>
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
      <div className="bordered" style={{ marginBottom: "10px" }}>
        <input
          placeholder="message"
          type="text"
          value={chatRoom}
          onChange={(e) => setChatRoom(e.target.value)}
        />
        <input
          placeholder="room"
          type="text"
          value={inputRoom}
          onChange={(e) => setInputRoom(e.target.value)}
        />
        <button onClick={() => toRoomMessage(inputRoom, chatRoom)}>
          toRoom
        </button>
      </div>
    </div>
  );
};

export default SendMessageRest;
