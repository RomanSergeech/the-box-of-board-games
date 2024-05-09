import { useEffect, useState } from "react"
import { classNames } from "@/shared/lib/utils"
import { ChooseCountPlayers, ChooseGame, EnterRoomName, PublishRoomBtn } from "./elements"
import { useUserStore } from "@/shared/store/user"
import { useRoomPageStore } from "@/shared/store/room-page"

import c from '../../roomPage.module.scss'

const MainSettings = () => {

   const [disabled, setDisabled] = useState(false)

   const openIdStore = useUserStore.getState().open_id
	const isHost = useRoomPageStore(state => !!state.users[openIdStore]?.host)
   const isPublished = useRoomPageStore(state => state.published)
   const isPublic = useRoomPageStore(state => state.isPublic)

   useEffect(() => {
      if ( !isHost || isPublished ) {
         setDisabled(true)
      } else {
         setDisabled(false)
      }
   }, [isHost, isPublished])

   return (
      <div className={classNames(
         'block',
         c.settings,
         c.main_settings,
         disabled ? '_disabled' : ''
      )} >

         {isPublic && <EnterRoomName disabled={disabled} />}
         
         <ChooseGame disabled={disabled} />

         <ChooseCountPlayers disabled={disabled} />

         {isPublic && <PublishRoomBtn />}

      </div>
   )
}

export { MainSettings }