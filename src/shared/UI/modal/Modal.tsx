import { ReactNode, forwardRef } from "react"
import { classNames } from "@/shared/lib/utils"

import c from './modal.module.scss'

interface ModalProps {
   children: ReactNode
   active: boolean
   className?: string
   wrapperClassName?: string
   onlyModalBody?: true
}
const Modal = forwardRef(({ children, active, className, wrapperClassName, onlyModalBody }: ModalProps, ref: React.ForwardedRef<HTMLDivElement>) => {

   if ( !active ) {
      return <></>
   }

   return (<>
      {!onlyModalBody
         ?
         <div className={classNames(c.modal, c.modal_animation, className)} ref={ref} >

            <div className={classNames('block', c.block_wrapper, wrapperClassName)} >
               {children}
            </div>

         </div>
         :
         <div className={classNames(c.modal_animation, className)} ref={ref} >
            {children}
         </div>
      }
   </>)
})

export { Modal }