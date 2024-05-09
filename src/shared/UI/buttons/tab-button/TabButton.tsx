import { ButtonHTMLAttributes, ReactNode } from "react"

import c from './tabButton.module.scss'

type TButtonProps = ButtonHTMLAttributes<HTMLElement>

type TabBtnProps = {
	children: ReactNode
	activeTab: boolean
} & TButtonProps

const TabButton = ({ children, activeTab, ...props }: TabBtnProps) => {
	return (
		<button
			className={`${c.button} ${activeTab ? c._active : ''}`}
			{...props}
		>
			{children}
		</button>
	)
}

export { TabButton }