// import io from 'socket.io-client'
// let socket

// const initiateSocket = (address) => {
//     if (socket?.connected) return
//     socket = io(process.env.NEXT_PUBLIC_SOCKET_DOMAIN, {
//         transports: ['websocket'],
//         query: {
//             address,
//         },
//         reconnection: true,
//         reconnectionDelay: 1000,
//         reconnectionDelayMax: 5000,
//         reconnectionAttempts: 4,
//     })
// }
// const disconnectSocket = () => {
//     if (socket) socket.disconnect()
//     socket = undefined
// }

// export { socket, initiateSocket, disconnectSocket }

const NEXT_PUBLIC_SOCKET_DOMAIN = process.env
    .NEXT_PUBLIC_SOCKET_DOMAIN as string

import io, { Socket } from 'socket.io-client'

let socket: Socket | undefined

const initiateSocket = (address: string) => {
    if (socket?.connected) return
    socket = io(NEXT_PUBLIC_SOCKET_DOMAIN, {
        transports: ['websocket'],
        query: {
            address: address.toLowerCase(),
        },
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 4,
    })
}
const disconnectSocket = () => {
    if (socket) socket.disconnect()
    socket = undefined
}

export { socket, initiateSocket, disconnectSocket }
