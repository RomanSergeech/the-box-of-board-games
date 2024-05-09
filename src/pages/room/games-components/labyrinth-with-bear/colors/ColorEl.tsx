import { classNames } from "@/shared/lib/utils"

import c from './colors.module.scss'

interface ColorElProps {
	color: string
	choosedColor: string
	occupiedColors: string[]
	chooseColor: (color: string) => void
}
const ColorEl = ({ color, choosedColor, occupiedColors, chooseColor }: ColorElProps) => {
	return (
		<>
		{occupiedColors.includes(color)
		?
			<span
            className={classNames(c.color, color, choosedColor === color ? '_active' : '_occupied')}
         >
				<span></span>
			</span>
		:
			<span
				className={classNames(c.color, color, choosedColor === color ? '_active' : '')}
				onClick={() => chooseColor(color)}
			>
				<span></span>
			</span>
		}
		</>
	)
}

export { ColorEl }