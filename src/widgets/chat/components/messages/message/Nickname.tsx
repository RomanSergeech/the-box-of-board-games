import { Link } from "react-router-dom"
import { Button, TooltipWrapper } from "@/shared/UI"
import { useUserStore } from "@/shared/store/user"
import { adminSocket } from "@/shared/api/socket"
import { useAdminStore } from "@/shared/store/admin"

import type { TChatMessage } from "@/shared/types/main-service/mainNsp.types"

import c from '../messages.module.scss'

interface TNicknameProps {
	message: TChatMessage
}
const Nickname = ({ message }: TNicknameProps) => {

   useAdminStore(state => state.socketConnected)

   const openIdStore = useUserStore.getState().open_id
   const blackList = useUserStore(state => state.black_list)
   const nicknameColor = useUserStore(state => state.nickname_color)

   const isAdmin = useUserStore.getState().role

   const deleteChatMessageHandler = () => {
      useAdminStore.getState().deleteChatMessage(message.id)
   }

   const muteUserHandler = ( termNum: number ) => {
      let term: number
      if ( termNum === -1 ) {
         term = Date.now() * 2
      } else {
         term = Date.now() + Math.round(termNum * 60_000)
      }

      useAdminStore.getState().muteUser({
         open_id: message.openId,
         nickname: message.nickname,
         term,
         reason: message.text
      })
   }

   const adminButtons = () => {
      if ( isAdmin !== 'Administrator' ) return
      if ( adminSocket.disconnected ) return
      return (<>
         <div className={c.mute_wrapper} >
            <span>Замутить</span>
            <Button onClick={() => muteUserHandler(5)} >5 <span>мин</span></Button>
            <Button onClick={() => muteUserHandler(30)} >30 <span>мин</span></Button>
            <Button onClick={() => muteUserHandler(1440)} >1 <span>день</span></Button>
            <Button onClick={() => muteUserHandler(-1)} ><span className={c.infinity} >8</span></Button>
         </div>
         <button
            className={c.delete_comment_button}
            onClick={deleteChatMessageHandler}
         >
            Удалить сообщение
         </button>
      </>)
   }

	return (
		<div className={c.nickname} >

			<TooltipWrapper
				orientation={'_top_right'}
            tooltipBodyClassname={c.tooltip_body}

				tooltipBody={<>
               {adminButtons()}
					<Link
						to={`/profile/${message.openId}`}
						className='tooltip_link'
						onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
					>
						Перейти в профиль
					</Link>
				</>}
			>

				<span
               className={blackList.includes(message.openId) ? '_in_black_list' : ''}
               style={
                  message.openId === openIdStore
                     ? { color: `#${nicknameColor}` }
                     : { color: `#${message.nickname_color}` }
               }
            >
               {message.nickname}
            </span>

			</TooltipWrapper>

		</div>
	)
}

export { Nickname }