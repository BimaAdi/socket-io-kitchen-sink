export interface ServerToClientEvents {
    noArg: () => void;
    socketid: (a: string) => void;
}

export interface ClientToServerEvents {
    hello: () => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    name: string;
    age: number;
    active: boolean;
}
