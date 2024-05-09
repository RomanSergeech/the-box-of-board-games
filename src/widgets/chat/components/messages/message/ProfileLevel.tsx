import { Link } from "react-router-dom"
import { TooltipWrapper } from "@/shared/UI"

import { EProfileLevel } from "@/shared/types/main-service/constants"
import type { TChatMessage } from "@/shared/types/main-service/mainNsp.types"

import c from '../messages.module.scss'

import level_2 from '/level_2.svg'
import level_3 from '/level_3.svg'

const LEVELS = {
   [EProfileLevel.level_1]: undefined,
   [EProfileLevel.level_2]: level_2,
   [EProfileLevel.level_3]: level_3
}


interface TStatusProps {
	message: TChatMessage
}
const ProfileLevel = ({ message }: TStatusProps) => {
	return (
		<div className={c.profile_level} >

			<TooltipWrapper
				orientation={'_top_right'}

				tooltipBody={<>
					Уровень&#160;профиля:&#160;
					<Link
						to="/shop"
						className='tooltip_link'
						onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
					>
						{message.profile_level.name}
					</Link>
				</>}
			>
				<img width={20} height={20} src={LEVELS[message.profile_level.level]} alt="" />
			</TooltipWrapper>

		</div>
	)
}

export { ProfileLevel }