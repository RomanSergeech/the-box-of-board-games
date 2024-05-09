import { GetUrl, classNames } from "@/shared/lib/utils"
import { Link } from "react-router-dom"
import { Avatar, OnlineStatus } from "@/shared/UI"

import type { TFriendData } from "@/shared/store/user"

import c from './friend.module.scss'

interface FriendProps {
   friend: TFriendData
   index: number
   showAllFriends: boolean
}
const Friend = ({ friend, index, showAllFriends }: FriendProps) => {
   return (
      <div className={classNames(c.friend, index >= 5 ? (showAllFriends ? '' : c._hidden) : '')} >

         <Avatar src={GetUrl.avatars(friend.avatar)} width="50px" height="50px" />

         <div>
            <Link
               to={`/profile/${friend.open_id}`}
               onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
            >
               {friend.nickname}
            </Link>

            <OnlineStatus className={c.online} isOnline={friend.online} />
         </div>
      </div>
   )
}

export { Friend }