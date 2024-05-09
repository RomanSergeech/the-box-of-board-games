import { ReactNode, useRef, RefObject } from "react"
import { useOutsideClick } from "@/shared/lib/hooks"
import { classNames } from "@/shared/lib/utils"

import './tooltip.scss'

interface TooltipProps {
	children: ReactNode
	triggerRef: RefObject<HTMLElement> | undefined
	opened: boolean
	orientation: '_top'|'_right'|'_bottom'|'_left'|'_top_right'
	onClose: () => void
}
const Tooltip = ({ children, triggerRef, opened = false, orientation, onClose }: TooltipProps) => {

	const tooltipRef = useRef<HTMLDivElement>(null)

	useOutsideClick({
		elementRef: tooltipRef,
		triggerRef,
		enabled: opened,
		onOutsideClick: onClose
	})

	if ( !opened ) return <></>

	return (
		<div
			className='tooltip'
			ref={tooltipRef}
		>
			<div className={classNames('tooltip_body', orientation)} >
				
				<span className="triangle"></span>
				
				{children}

			</div>
		</div>
	)
}

export { Tooltip }