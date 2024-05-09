import { useEffect } from "react"
// import { YANDEX_COUNTER_ID } from "@/shared/constants"
import { EProfileLevel, TAllGamesIds, TAllItemsIds } from "@/shared/types/main-service/constants"

export const usePageCounter = () => {

   useEffect(() => {

      const url = window.location.href
      
      if ( url ) {
         //@ts-ignore
         // window.ym(YANDEX_COUNTER_ID, 'hit', url);
      }

   }, [])

}

export const enum EGoals {
   buySubscription = 'BUY_SUBSCRIPTION',
   buyGame = 'BUY_GAME',
   buyItem = 'BUY_ITEM'
}

export function yandexMetrikaReachTheGoal(
   id: EGoals.buySubscription,
   goalParams: { order_price: number, purchase: `${EProfileLevel}` }
): void

export function yandexMetrikaReachTheGoal(
   id: EGoals.buyGame,
   goalParams: { order_price: number, purchase: TAllGamesIds }
): void

export function yandexMetrikaReachTheGoal(
   id: EGoals.buyItem,
   goalParams: { order_price: number, purchase: TAllItemsIds }
): void

export function yandexMetrikaReachTheGoal( id: `${EGoals}`, goalParams: { order_price: number, purchase: string } ) {

   console.log(id, goalParams);

   // @ts-ignore
   // window.ym(YANDEX_COUNTER_ID, 'reachGoal', id, { currency: "RUB", ...goalParams });

}