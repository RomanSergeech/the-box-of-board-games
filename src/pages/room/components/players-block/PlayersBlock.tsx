import { useRoomPageStore } from "@/shared/store/room-page"
import { useUserStore } from "@/shared/store/user"
import { classNames } from "@/shared/lib/utils"
import { AddPlayer, Players, ReadyBtn } from "./elements"

import c from './players.module.scss'

const PlayersBlock = () => {

   const openIdStore = useUserStore.getState().open_id
   const isHost = useRoomPageStore(state => !!state.users[openIdStore]?.host)

   return (
      <div className={classNames('block', c.players)} >

         <Players />

         {isHost && <AddPlayer />}

         <ReadyBtn />

      </div>
   )
}

export { PlayersBlock }