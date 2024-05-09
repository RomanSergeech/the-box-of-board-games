import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { mainSocket } from "../api/socket"
import { useUserStore } from "./user"

import { EProfileLevel, type TAllGamesIds } from "@/shared/types/main-service/constants"
import type{ TUserDto } from "../types/main-service/auth.types"
import type { TAllGames, TAllItems, TMainNspConnectData } from "@/shared/types/main-service/mainNsp.types"

interface TShopState {
   allGames: TAllGames | null
   allItems: TAllItems | null

   balance: Exclude<TMainNspConnectData['balance'], undefined>
	transactions_history: TUserDto['transactions_history']
   subscriptions: TMainNspConnectData['subscriptions']
}

interface TShopStore extends TShopState {
	buySubscription: ( level: `${EProfileLevel}`, choosedSubscriptionTerm: number ) => Promise<{ order_price: number } | undefined>
   buyGame: ( gameId: TAllGamesIds ) => Promise<{ order_price: number } | undefined>
}

const initialState: TShopState = {
   allGames: null,
   allItems: null,

	balance: 0,
   transactions_history: [],
   subscriptions: { 'level_2': [] as any, 'level_3': [] as any },
}

export const useShopStore = create(
	devtools<TShopStore>((set) => ({
		...initialState,

		buySubscription: async ( level, choosedSubscriptionTerm ) => {
         if ( level === EProfileLevel.level_1 ) return

         return new Promise((resolve, reject) => {

				mainSocket.emit('api:buySubscription', level, choosedSubscriptionTerm, (data, error) => {
               if ( error || data === undefined ) {
                  reject(error.message)
                  return
               }

               set({
                  balance: data.balance,
                  transactions_history: data.transactions_history
               })

               useUserStore.setState({
                  daily_tasks: data.daily_tasks,
                  profile_level: data.profile_level,
                  games_statistics: data.games_statistics
               })

               resolve({
                  order_price: data.order_price
               })
            })
			})
      },

		buyGame: async ( gameId ) => {
         return new Promise((resolve, reject) => {

				mainSocket.emit('api:buyGame', gameId, (data, error) => {
               if ( error || data === undefined ) {
                  reject(error.message)
                  return
               }

               set({
                  balance: data.balance,
                  transactions_history: data.transactions_history
               })

               useUserStore.setState({ games: data.games })

               resolve({
                  order_price: data.order_price
               })
            })
			})
      }

	}))
)