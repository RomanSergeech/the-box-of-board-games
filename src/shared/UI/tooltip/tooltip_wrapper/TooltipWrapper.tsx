import { ReactNode } from 'react'

import c from './tooltipWrapper.module.scss'
import { classNames } from '@/shared/lib/utils'

interface TooltipWrapperProps {
   children: ReactNode
	tooltipBody: ReactNode
   orientation: '_top'|'_right'|'_bottom'|'_left'|'_top_right'
}
const TooltipWrapper = ({ children, tooltipBody, orientation }: TooltipWrapperProps) => {
   return (
      <details className={classNames(c.tooltip_wrapper, c[orientation])} >

         <summary>
            {children}
         </summary>

         <div className={classNames(c.tooltip, c[orientation])} >
            <span className={c.triangle} ></span>
            {tooltipBody}
         </div>

      </details>
   )
}

export { TooltipWrapper }