import { GetUrl, classNames } from '@/shared/lib/utils'

import type { ImgHTMLAttributes } from 'react'

import c from './img.module.scss'

type ImgProps = {
   src?: string
   borderColor?: 'text' | 'main' | 'border'
} & ImgHTMLAttributes<HTMLImageElement>

const Img = ({ className, borderColor = 'text', ...props }: ImgProps) => {
   return (
      <img
			alt="#"
         className={classNames(c.img, className, c['border-color-'+borderColor])}
			{...props}
			onError={(e: any) => {e.target.src = GetUrl.defaultImage()}}
		/>
   )
}

export { Img }