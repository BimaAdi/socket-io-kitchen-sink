
const User = ({ socketId, message, room = undefined }: { socketId: string, message: string, room?: string | undefined }) => {
    return (
        <div className="bordered">
            <div>socket id: {socketId}</div>
            <div>room: {room ? room : ""}</div>
            <div>receive_message: {message}</div>
        </div>
    )
}

export default User