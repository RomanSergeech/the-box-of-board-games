import { useRef, useState } from "react"
import { useRoomPageStore } from "@/shared/store/room-page"
import { useUserStore } from "@/shared/store/user"
import { Avatar } from "@/shared/UI"
import { GetUrl, classNames } from "@/shared/lib/utils"
import { ReadyLabel } from "./ReadyLabel"
import { PlayerTooltip } from "./PlayerTooltip"
import type { TRoomUser } from "@/shared/types/main-service/roomNsp.types"

import c from '../../players.module.scss'

interface TPlayerProps {
	user: TRoomUser
}
const Player = ({ user }: TPlayerProps) => {

   const openIdStore = useUserStore.getState().open_id
   const users = useRoomPageStore.getState().users
   const iAmReady = useRoomPageStore(state => state.readyPlayers[openIdStore])

	const itIsMe = openIdStore === user.openId
   const isHost = !!users[openIdStore]?.host

	const [openedTooltip, setOpenedTooltip] = useState(false)

	const playerItemRef = useRef<HTMLDivElement>(null)

   const openTooltipHandler = () => {
      if ( !isHost && !itIsMe ) return
      setOpenedTooltip(prev => !prev)
   }

	return (
		<div
			className={classNames(
            c.player,
            user?.host ? c._host : '',
            user.reconnecting ? c._reconnecting : '',
            itIsMe && iAmReady ? '_disabled' : ''
         )}
			id={`player${user.openId}`}
		>

         <ReadyLabel user={user} />

			<div
				className={classNames(
               c.player_item,
               itIsMe ? c._me : '',
               (isHost && !user?.host) ? c._pointer : ''
            )}
				ref={playerItemRef}
				onClick={openTooltipHandler}
			>
				<div className={c.avatar_wrapper} >
					<Avatar
						className={classNames(c.img, c[user.color||''])}
						src={GetUrl.avatars(user.avatar)}
						width="50px"
						height="50px"
					/>
				</div>
				<span className={c.nickname} >{user.nickname}</span>
				<svg className={c.reconnecting_svg} width="20" height="20" viewBox="0 0 19 19" fill="none" ><path d="M7.99996 0H5.99996V1.88L7.99996 3.88V0ZM14 6V9.88L15.8 11.68L16 11.48V6C16 4.9 15.1 4 14 4V0H12V4H8.11996L10.12 6H14ZM2.11996 0.84L0.709961 2.25L3.99996 5.54V11.5L7.49996 15V18H12.5V15L12.98 14.52L17.45 18.99L18.86 17.58L2.11996 0.84ZM10.5 14.17V16H9.49996V14.17L5.99996 10.65V7.54L11.57 13.11L10.5 14.17V14.17Z" fill="white"/></svg>
			</div>

			{(itIsMe || isHost) &&
				<PlayerTooltip
               isHost={isHost}
               itIsMe={itIsMe}
               user={user}
               openedTooltip={openedTooltip}
               playerItemRef={playerItemRef}
               setOpenedTooltip={setOpenedTooltip}
            />
			}
		</div>
	)
}



export { Player }