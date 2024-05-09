import { Manager } from "socket.io-client"
import { useReconnectStore } from "@/shared/store/reconnect"
export { emitSocketConnect } from "./emitSocketConnect"

import type { Socket } from "socket.io-client"
import type { TMainNspClientToServerEvents, TMainNspServerToClientEvents } from "@/shared/types/main-service/mainNspEvents.types"
import type { TCommonNspClientToServerEvents } from "@/shared/types/main-service/commonNspEvents.types"
import type { TApiNspClientToServerEvents } from "@/shared/types/main-service/apiNspEvents.types"
import type { TRoomNspClientToServerEvents, TRoomNspServerToClientEvents } from "@/shared/types/main-service/roomNspEvents.types"
import type { TAdminNspClientToServerEvents, TAdminNspServerToClientEvents } from "@/shared/types/main-service/adminNspEvents.types"
import type { TGameServerToClientEvents as TMonopolyServerToClientEvents, TGameClientToServerEvents as TMonopolyClientToServerEvents } from "@/shared/types/games-service/monopolyEvents.types"
import type { TGameServerToClientEvents as TLabyrinthWithBearServerToClientEvents, TGameClientToServerEvents as TLabyrinthWithBearClientToServerEvents } from "@/shared/types/games-service/labyrinthWithBearEvents.types"
import { EAllGamesIds } from "@/shared/types/main-service/constants"


const MAIN_SERVICE_URL = import.meta.env.VITE_MAIN_SERVICE_URL
const DOMEN_URL = import.meta.env.VITE_DOMEN_URL

console.log(MAIN_SERVICE_URL);

function reconnectMiddleware() {
   console.log('reconnect')
   useReconnectStore.getState().reconnect()
}

const manager = new Manager(MAIN_SERVICE_URL, {
   path: '/socket.io/api',
   autoConnect: false,
   reconnection: true,
   reconnectionAttempts: 10
}).on('reconnect', reconnectMiddleware)

export const mainSocket: Socket<
   TMainNspServerToClientEvents,
   TCommonNspClientToServerEvents &
   TMainNspClientToServerEvents &
   TApiNspClientToServerEvents
> = manager.socket("/")

export const roomSocket: Socket<
   TRoomNspServerToClientEvents,
   TCommonNspClientToServerEvents &
   TRoomNspClientToServerEvents &
   TApiNspClientToServerEvents
> = manager.socket("/room")



const adminManager = new Manager(MAIN_SERVICE_URL, {
   path: '/socket.io/api',
   autoConnect: false,
   reconnection: true,
   reconnectionAttempts: 10,
   withCredentials: true,
   extraHeaders: {
      authorization: `bearer ${localStorage.getItem('token')}`
   }
}).on('reconnect', reconnectMiddleware)

export const adminSocket: Socket<
   TAdminNspServerToClientEvents,
   TAdminNspClientToServerEvents
> = adminManager.socket("/admin")



const options = {
   autoConnect: false,
   reconnection: true,
   reconnectionAttempts: 10
}

type TSockets = [
   Socket<TLabyrinthWithBearServerToClientEvents, TLabyrinthWithBearClientToServerEvents>,
   Socket<TMonopolyServerToClientEvents, TMonopolyClientToServerEvents>,
   Socket,
   Socket,
   Socket,
]

const sockets = [
   EAllGamesIds.labyrinthWithBear,
   EAllGamesIds.monopoly
]

export const [

   labyrinthWithBearSocket,
   monopolySocket

] = sockets.reduce<TSockets>((acc, gameId) => {
   acc.push(
      new Manager(`${DOMEN_URL}/${gameId}`, {
         path: `/socket.io/game/${gameId}`,
         ...options
      }).on('reconnect', reconnectMiddleware).socket('/')
   )
   return acc
}, [] as any)

// export const labyrinthWithBearSocket = new Manager('https://6d8r6db6-8001.euw.devtunnels.ms', options).on('reconnect', reconnectMiddleware).socket('/')
// export const monopolySocket = new Manager('https://6d8r6db6-8002.euw.devtunnels.ms', options).on('reconnect', reconnectMiddleware).socket('/')

// export const labyrinthWithBearSocket = new Manager('http://localhost:8001', options).on('reconnect', reconnectMiddleware).socket('/')
// export const monopolySocket = new Manager('http://localhost:8002', options).on('reconnect', reconnectMiddleware).socket('/')