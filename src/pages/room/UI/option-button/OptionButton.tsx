import { ButtonHTMLAttributes, ReactNode } from 'react'
import { classNames } from '@/shared/lib/utils'

import c from './optionButton.module.scss'
import { ToggleButton } from '@/shared/UI'


type TButtonProps = ButtonHTMLAttributes<HTMLElement>

type OptionButtonProps = {
   children: ReactNode
   active: boolean
   size?: 1 | 2 | 3
   onClick: () => void
} & TButtonProps

const OptionButton = ({ children, active, size = 1, onClick, ...props }: OptionButtonProps) => {
   return (
      <ToggleButton
         className={classNames(
            c.button,
            size === 2 ? c._size_2 : '',
            size === 3 ? c._size_3 : '',
            active ? c._active : '',
         )}
         onClick={onClick}
         {...props}
      >
         {children}
      </ToggleButton>
   )
}

export { OptionButton }