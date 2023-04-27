import { useEffect } from 'react';
import { Socket, io } from 'socket.io-client';

const URL = "http://localhost:3000"
const socket = () => {
    useEffect(() => {
        const socket: Socket<{}, {}> = io(URL, {
            autoConnect: false
        })
        socket.connect();

        function onConnect() {
            console.log("connected")
        }

        function onDisconnect() {
            console.log("disconected")
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, [])
}

export default socket