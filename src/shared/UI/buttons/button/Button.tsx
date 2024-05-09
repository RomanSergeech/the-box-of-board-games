import { ButtonHTMLAttributes, ForwardedRef, ReactNode, forwardRef } from "react"
import { Link } from "react-router-dom"
import { classNames } from "@/shared/lib/utils"

import c from './button.module.scss'

type TButtonProps = ButtonHTMLAttributes<HTMLElement>

export type TColorVariables = 'main' | 'green' | 'red' | 'red_light' | 'border' | 'text'

type ButtonProps = {
   children: ReactNode
   to?: string
   borderColor?: TColorVariables
   textColor?: TColorVariables
} & TButtonProps

const Button = forwardRef(({ children, className, to, borderColor='border', textColor='text', ...props }: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {

   const commonAttrs = {
      className: classNames(
         className,
         c.button,
         c[`border_color-${borderColor}`],
         c[`text_color-${textColor}`]
      ),
      ...props
   }
   
   return (
      <>{to
         ?
            <Link
               to={to}
               {...commonAttrs}
            >
               {children}
            </Link>
         :
            <button {...commonAttrs} ref={ref} >
               {children}
            </button>
      }</>
   )
})

export { Button }