import { ReactNode } from 'react'
import { classNames } from '@/shared/lib/utils'

import './tooltipWrapper.scss'

interface TErrorTooltipProps {
	children: ReactNode
	tooltipBody: ReactNode
	orientation: '_top'|'_right'|'_bottom'|'_left'|'_top_right'
	isActive: boolean
	className?: string
}
const ErrorTooltipWrapper = ({ children, tooltipBody, orientation, isActive, className }: TErrorTooltipProps) => {
	return (
		<div className={classNames('tooltip_wrapper', className || '')} >

			{children}

			<div className={classNames('tooltip_body', orientation, '_errorTooltip', isActive ? '_active' : '')} >
				<span className="triangle"></span>
				{tooltipBody}
			</div>

		</div>
	)
}

export { ErrorTooltipWrapper }