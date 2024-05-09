import { roomSocket } from "@/shared/api/socket"
import { classNames } from "@/shared/lib/utils"

import c from '../../players.module.scss'

const BecomeHost = () => {
   
   const becomeHostHandler = () => {
      roomSocket.emit('addNewHost')
   }

   return (
      <div
         className={classNames(c.player, c.player_item, c.add_new_host)}
         onClick={becomeHostHandler}
      >
         <div className={`${c.img} ${c.image_pluse}`} ></div>
         <span className={`${c.nickname} ${c.add_player_btn}`} >Стать<br/>хостом</span>
      </div>
   )
}

export { BecomeHost }