import { ProfileLevel } from './ProfileLevel'
import { Nickname } from "./Nickname"
import { Avatar } from '@/shared/UI'
import { GetUrl } from '@/shared/lib/utils'

import { EProfileLevel } from '@/shared/types/main-service/constants'
import type { TChatMessage } from '@/shared/types/main-service/mainNsp.types'

import c from '../messages.module.scss'

interface TMessageProps {
	message: TChatMessage
}
const Message = ({ message }: TMessageProps) => {
	return (
		<div className={c.chat_item} >

			<div>

				<Avatar src={GetUrl.avatars(message.avatar)} width='20px' height='20px' />

				{message.profile_level.level !== EProfileLevel.level_1 &&
               <ProfileLevel message={message} />
            }

				<Nickname message={message} />

			</div>

			<p>{message.text}</p>

		</div>
	)
}

export { Message }