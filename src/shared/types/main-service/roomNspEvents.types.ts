import { TAllGamesIds } from "./constants.js"
import { TChatAllMessages, TChatMessage } from "./game.types.js"

import { TCreateRoomData, TGameSettings, TNewRoomStateData, TRoomConnectData, TRoomData, TRoomUser, TRoomUsers } from "./roomNsp.types.js"

export interface TRoomNspClientToServerEvents {

	createRoom: (
      data: TCreateRoomData,
      callback: (obj: { err: boolean }) => void
   ) => void

	connectToRoom: (
      data: TRoomConnectData,
      callback: (obj: {
         err?: | 'Room Not Found'
               | 'Game Runned'
               | 'Sth Went Wrong'
               | 'Not Enough Space'
               | 'Was Kicked'
               | 'There Is Player Who Added You To The Black List'
         warning?: 'There Is Player From Black List'
         roomData?: TRoomData<TRoomUsers>
         chat?: TChatAllMessages
         gameId?: TAllGamesIds | null
      }) => void
   ) => void

	createGame: (
      callback: ( obj: {
         err?: | 'Room Not Found'
               | 'Already Game Created'
               | 'Game Is Not Available'
         gameCreated?: true
      } ) => void
   ) => void

	kickPlayer: (
      openId: string
   ) => void

   addNewHost: () => void

   makeUserANewHost: (
      newHostOpenId: string
   ) => void

	requestAddUserToLobby: (
      userOpenId: string,
      senderNickname: string,
      callback: (obj: {
         error?: 'User Not Online'
      }) => void
   ) => void

	setSettings: (
      gameSettings: TGameSettings
   ) => void

	playerReady: (
      isReady: boolean
   ) => void

	choosedColor: (
      openId: string,
      color: string
   ) => void

	choosedGame: (
      gameId: TAllGamesIds
   ) => void

	choosedCountUsers: (
      count: number
   ) => void

	publishRoom: (
      roomName?: string
   ) => void

   newMessage: (
      msg: TChatMessage
   ) => void

}

export interface TRoomNspServerToClientEvents {

   gameRunned: (obj: { gameId: TAllGamesIds, roomId: string }) => void

	newRoomData: ( newStateData: TNewRoomStateData ) => void

	currentOnline: ( currentOnline: number ) => void

	playersReadiness: ( players: string[], isReady: boolean ) => void
	
	playerReconnecting: ( dataObj: { openId: string, reconnecting: boolean } ) => void

	addUsers: ( users: TRoomUser[] ) => void

   deleteUsers: ( users: string[] ) => void

	rejectAddToLobby: ( nickname: string ) => void

	kicked: () => void

	newHost: ( openId: string ) => void

   makeUserANewHost: ( pastHost: string, newHost: string ) => void

   newMessage: ( msg: TChatMessage ) => void

}