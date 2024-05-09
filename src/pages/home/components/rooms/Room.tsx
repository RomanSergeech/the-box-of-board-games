import { Link } from "react-router-dom"
import { Avatar } from "@/shared/UI"
import { GetUrl, classNames } from "@/shared/lib/utils"
import { useShopStore } from "@/shared/store/shop"
import { useUserStore } from "@/shared/store/user"

import type { TPublishedRoom } from "@/shared/types/main-service/mainNsp.types"
import type { TAllGamesIds } from "@/shared/types/main-service/constants"

import c from './rooms.module.scss'
import { useAuthStore } from "@/shared/store/auth"
import { useHeaderStore } from "@/shared/store/header"


interface RoomProps {
   room: TPublishedRoom
}
const Room = ({ room }: RoomProps) => {

   const blackList = useUserStore(state => state.black_list)

   const allGames = useShopStore.getState().allGames

   const isAuth = useAuthStore.getState().isAuth
   const activateLoginTab = useHeaderStore.getState().activateLoginTab

   return (
      <div className={c.game} >

         <div className={c.game_name_wrapper} >
            <h3>{allGames?.[room.gameId as TAllGamesIds].gameName}</h3>
            {room?.roomName && <p>{room.roomName}</p> }
         </div>

         <div className={c.game_body_wrapper} >
            <div className={c.game_body} >

               {room.users.map((user) =>
                  <div
                     className={user?.host && c.host}
                     key={user.openId}
                  >
                     <Avatar
                        src={GetUrl.avatars(user.avatar)}
                        width="50px"
                        height="50px"
                     />
                     <span className={classNames(c.nickname, blackList.includes(user.openId) ? '_in_black_list' : '')}>
                        {user.nickname}
                     </span>
                  </div>
               )}

               {Array.from(Array(room.choosedCountUsers).keys()).map(el => {
                  if (el+1 > room.users.length) {
                     return (
                     <div key={el} >
                        <span className={c.avatar} ></span>
                        <span className={c.nickname} >-----</span>
                     </div> )
                  }
               })}

            </div>
         </div>

         {isAuth
         ?
            <Link
               className={c.join_btn}
               to={`/room/${room.roomId}`}
               onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
            >
               Присоединиться
            </Link>
         :
            <button
               className={c.join_btn}
               onClick={() => {
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                  activateLoginTab()
               }}
            >
               Присоединиться
            </button>
         }
         

      </div>
   )
}

export { Room }