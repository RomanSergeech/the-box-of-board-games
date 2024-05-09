import { TLabyrinthsData } from "@/games/labyrinth-with-bear/game.models"
import { del, get, update as updateQueue } from "idb-keyval"

type TUpdate = <T>( key: string, value: T ) => Promise<void>

type TRemove = ( key: string ) => void

export const updateGameDataIdb = ( callback: (obj: {
   gameData: TLabyrinthsData,
   update: TUpdate,
   remove: TRemove
}) => void ) => {

   get<TLabyrinthsData>('gameData').then((gameData) => {

      const update: TUpdate = ( key, value ) => {
         return updateQueue('gameData', (gameData) => ({ ...gameData, [key]: value }))
      }

      const remove: TRemove = ( key ) => {
         del(key)
      }

      if ( !gameData ) return

      return callback({ gameData, update, remove })
   })

}

export const getGameDataIdb = <T extends TLabyrinthsData>() => {

   return get<T>('gameData').then((gameData) => {
      return gameData
   })

}