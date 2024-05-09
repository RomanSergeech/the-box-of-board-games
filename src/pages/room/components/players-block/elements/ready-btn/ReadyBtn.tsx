import { useRef } from "react"
import { useUserStore } from "@/shared/store/user"
import { useRoomPageStore } from "@/shared/store/room-page"
import { roomSocket } from "@/shared/api/socket"
import { Button } from "@/shared/UI"
import { classNames } from "@/shared/lib/utils"

import c from './readyBtn.module.scss'

const ReadyBtn = () => {

   const openIdStore = useUserStore.getState().open_id

   const choosedGame = useRoomPageStore(state => state.choosedGame)
   const choosedCountUsers = useRoomPageStore(state => state.choosedCountUsers)
   const isReady = useRoomPageStore(state => state.readyPlayers[openIdStore])

   const timerRef = useRef<any>(null)

   const readyHandler = ( isReady: boolean ) => {

      useRoomPageStore.getState().playersReadiness([openIdStore], isReady)

      clearTimeout(timerRef.current)

      timerRef.current = setTimeout(() => {
         roomSocket.emit('playerReady', isReady)
      }, 500)

   }

   if (!choosedGame || !choosedCountUsers) return <></>

   return (
      <div  className={c.wrapper} >
         <Button
            className={classNames(c.button, isReady ? c._ready : '')}
            borderColor="main"
            textColor="main"
            onClick={() => readyHandler(!isReady)}
         >
            Готов
         </Button>
      </div>
   )
}

export { ReadyBtn }