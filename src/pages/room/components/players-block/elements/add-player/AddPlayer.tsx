import { MouseEvent } from "react"
import { AddPlayerForm } from "./AddPlayerForm"
import { useUserStore } from "@/shared/store/user"
import { useFriendsStore } from "@/shared/store/friends"
import { roomSocket } from "@/shared/api/socket"
import { Avatar, Button, TooltipWrapper } from "@/shared/UI"
import { GetUrl, classNames, showAlert } from "@/shared/lib/utils"
import { useRoomPageStore } from "@/shared/store/room-page"

import type { TFriendData } from "@/shared/store/user"

import c from '../../players.module.scss'

const AddPlayer = () => {

   const nicknameStore = useUserStore.getState().nickname

   const friends = useFriendsStore(state => state.friends)

   const { choosedCountUsers, usersStore } = useRoomPageStore(state => ({
      choosedCountUsers: state.choosedCountUsers,
      usersStore: state.users
   }))

   const addFriendHandler = ( openId: string, e?: MouseEvent ) => {

      roomSocket.emit('requestAddUserToLobby', openId, nicknameStore, ({ error }) => {
         if ( error ) {
            showAlert({
               text: ['Игрок не онлайн']
            }, 1000)
            return
         }
      })

      if ( !(e?.currentTarget instanceof HTMLElement) ) return

      if ( e?.currentTarget ) {
         e.currentTarget.style.pointerEvents = 'none'
         e.currentTarget.innerText = 'Приглашен'

         setTimeout((el) => {
            el.innerText = 'Пригласить'
            el.style.pointerEvents = 'all'
         }, 10_000, e.currentTarget)
      }

   }

   return (
      <>
         {choosedCountUsers > Object.values(usersStore).length &&
         choosedCountUsers !== 1 &&
         // ( !isRoomOpened || (isRoomOpened && isRoomPublished) ) &&
         <div
            className={`${c.player} ${c.add_player}`}
         >
            <TooltipWrapper
               orientation={'_bottom'}
               className={c.add_player_tooltip_wrapper}
               tooltipBody={<>
                  <AddPlayerForm />

                  <div className={c.add_friend_wrapper} >
                     {Object.values(friends || {}).map((friend: TFriendData) => {

                        if ( Object.keys(usersStore).includes(''+friend.open_id) ) return

                        return (
                           <div key={friend.open_id} className={c.add_friend_item} >

                              <Avatar className={c.img} src={GetUrl.avatars(friend.avatar)} />

                              <p>{friend.nickname}</p>

                              <Button onClick={(e) => addFriendHandler( friend.open_id, e )} >Пригласить</Button>

                           </div>
                        )
                     }) }
                  </div>
               </>}
            >
               <div className={c.player_item} >
                  <div className={classNames(c.img, c.image_pluse)} ></div>
                  <span className={classNames(c.nickname, c.add_player_btn)} >Пригласить</span>
               </div>
            </TooltipWrapper>
         </div>
         }
      </>
   )
}


export { AddPlayer }