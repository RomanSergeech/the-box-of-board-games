import { ButtonHTMLAttributes, ReactNode } from "react"
import { classNames } from "@/shared/lib/utils"

import c from './toggleButton.module.scss'

type TButtonProps = ButtonHTMLAttributes<HTMLElement>

type ToggleButtonProps = {
	children: ReactNode
   active?: boolean
} & TButtonProps

const ToggleButton = ({ children, active, className, ...props }: ToggleButtonProps) => {
	return (
		<button
			className={classNames(c.button, className, active ? c._active : '')}
			{...props}
		>
			{children}
		</button>
	)
}

export { ToggleButton }