export interface ServerToClientEvents {
    noArg: () => void;
    socketid: (a: string) => void;
    message: (message: string) => void;
}

export interface ClientToServerEvents {
    joinRoom: (room: string) => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    name: string;
    age: number;
    active: boolean;
}
