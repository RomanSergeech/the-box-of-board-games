import { ReactNode, useState, useRef, useEffect } from "react"
import { useOutsideClick } from "@/shared/lib/hooks"
import { classNames } from "@/shared/lib/utils"

import './tooltipWrapper.scss'

interface TooltipProps {
	children: ReactNode
	tooltipBody: ReactNode
	orientation: '_top'|'_right'|'_bottom'|'_left'|'_top_right'
   className?: string
   tooltipBodyClassname?: string
	hoverEffect?: boolean
   onCloseAction?: () => void
}

const TooltipWrapper = ({ children, tooltipBody, orientation, className, tooltipBodyClassname, hoverEffect, onCloseAction }: TooltipProps) => {

	const [openedTooltip, setOpenedTooltip] = useState(false)

	const tooltipRef = useRef<HTMLDivElement>(null)
	const triggerRef = useRef<HTMLDivElement>(null)

	const onClose = () => {
		setOpenedTooltip(false)
      onCloseAction?.()
	}

	useOutsideClick({
		elementRef: tooltipRef,
		triggerRef: triggerRef,
		enabled: openedTooltip,
		onOutsideClick: onClose
	})

   // const click = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
   //    const elementRect = e.currentTarget.getBoundingClientRect()
   //    const elementHidesUp = elementRect.top < 0;
   //    const elementHidesLeft = elementRect.left < 0;
   //    const elementHidesDown = elementRect.bottom > window.innerHeight;
   //    const elementHidesRight = elementRect.right > window.innerWidth;
   //    const elementHides = elementHidesUp || elementHidesLeft || elementHidesDown || elementHidesRight;
   //    console.log(elementHides);
   // }

   const [tooltipHides, setTooltipHides] = useState('')

   useEffect(() => {
      const el = tooltipRef.current

      if ( openedTooltip && el ) {
         const elementRect = el.getBoundingClientRect()

         const elementHidesUp = elementRect.top < 0
         const elementHidesLeft = elementRect.left < 0
         const elementHidesDown = elementRect.bottom > window.innerHeight
         const elementHidesRight = elementRect.right > window.innerWidth

         if ( elementHidesLeft ) {
            setTooltipHides('left')
         } else if ( elementHidesRight ) {
            setTooltipHides('right')
         } else if ( elementHidesUp ) {
            setTooltipHides('top')
         } else if  ( elementHidesDown ) {
            setTooltipHides('bottom')
         }
      }
   }, [openedTooltip])

	return (
		<div className={classNames('tooltip_wrapper', hoverEffect ? '_hover' : '', className)} >

			<div
				ref={triggerRef}
				onClick={() => setOpenedTooltip(prev => !prev)}
			>
				{children}
			</div>

			{(openedTooltip || hoverEffect) &&
				<div
					className={classNames(
                  'tooltip_body',
                  orientation,
                  hoverEffect ? '_hover' : '',
                  openedTooltip && hoverEffect ? '_active' : '',
                  tooltipHides ? '_tooltip_hides' : '',
                  tooltipBodyClassname
               )}
					ref={tooltipRef}
               // onClick={click}
				>
					<span className="triangle"></span>
					{tooltipBody}
				</div>
			}

		</div>
	)
}

export { TooltipWrapper }