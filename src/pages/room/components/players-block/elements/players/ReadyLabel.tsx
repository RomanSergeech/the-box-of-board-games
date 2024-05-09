import { classNames } from "@/shared/lib/utils"
import { useRoomPageStore } from "@/shared/store/room-page"

import c from '../../players.module.scss'
import { TRoomUser } from "@/shared/types/main-service/roomNsp.types"

interface ReadyLabelProps {
	user: TRoomUser
}
const ReadyLabel = ({ user }: ReadyLabelProps) => {

   const isReady = useRoomPageStore(state => state.readyPlayers[user.openId])

   return (
      <>
         {user?.host &&
            <p className={classNames(c.user_label, isReady ? c._ready : '')} >{
               isReady ? 'готов' : 'хост'
            }</p>
         }

         {!user?.host &&
            <p className={classNames(c.user_label, isReady ? c._ready : '')} >{
               isReady ? 'готов' : ''
            }</p>
         }
      </>
   )
}

export { ReadyLabel }