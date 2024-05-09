import type { ImgHTMLAttributes } from 'react'
import { GetUrl, classNames } from '@/shared/lib/utils'
import { DEFAULT_AVATAR } from '@/shared/constants'

import c from './avatar.module.scss'

type AvatarProps = {
   src?: string
   borderColor?: 'text' | 'main' | 'none'
} & ImgHTMLAttributes<HTMLImageElement>
3
const Avatar = ({ borderColor='text', className, ...props }: AvatarProps) => {

   if ( props.src && props.src.endsWith(DEFAULT_AVATAR) ) {
      props.src = GetUrl.defaultAvatar()
   }

	return (
		<img
			alt="#"
         className={classNames(
            c.avatar,
            className,
            borderColor === 'none' ? '' : `border_color-${borderColor}`,
            !props.src ? c._empty : ''
         )}
			{...props}
			onError={(e: any) => {e.target.src = GetUrl.defaultAvatar()}}
		/>
	)
}

export { Avatar }