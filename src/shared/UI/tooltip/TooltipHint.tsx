import { ReactNode } from "react"

import c from './tooltipHint.module.scss'

interface TooltipHintProps {
   children: ReactNode
   hintText: string
   direction: 'top' | 'right' | 'bottom' | 'left'
   onClick?: () => void
}
const TooltipHint = ({ children, hintText, direction, ...props }: TooltipHintProps) => {
   return (
      <span
         className={c.tooltip}
         //@ts-ignore
         tooltip={hintText}
         direction={direction}
         {...props}
      >
         {children}
      </span>
   )
}

export { TooltipHint }