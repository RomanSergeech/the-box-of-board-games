import { ChangeEvent, useRef, useState } from 'react'
import { Img, Loader } from '@/shared/UI'
import { getResizedImg, isFileSizeAllowed, isUploadAllowed } from './utils'
import { classNames } from '@/shared/lib/utils'

import DefaultImage from '@/shared/assets/images/common/DefaultImage.webp'

import c from './newsImage.module.scss'

interface NewsImageProps {
   setLoadedFile: ( file: Blob | null ) => void
}
const NewsImage = ({ setLoadedFile }: NewsImageProps) => {
   
	const [loading, setLoading] = useState(false)
	const [loadedImg, setLoadedImg] = useState('')

	const inputRef = useRef<HTMLInputElement>(null)

	const loadImg = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {

		if ( !e.target.files ) return

		const file = e.target.files[0]!

		//  отмена, если изображение больше 10 МБ  //
		if ( !isFileSizeAllowed(file) ) return

		//  отмена, если с прошлой загрузки не прошло 10 сек  //
		if ( !isUploadAllowed(file) ) return

		const img: HTMLImageElement = new Image()
		img.src = URL.createObjectURL(file)

		img.onload = async () => {
			setLoading(true)
			try {
				const imgWidth = img.width
				const imgHeight = img.height

				const resizedImg: Blob = await getResizedImg({img, imgWidth, imgHeight})

				setLoadedImg(URL.createObjectURL(resizedImg))
            setLoadedFile(resizedImg)
			} finally {
				setLoading(false)
			}
		}
	}

	return (
		<div className={classNames('img', c.avatar_wrapper)} >
			<div className={classNames(c.avatar, c._download)} >
            {loading
            ?
               <Loader fontSize={5} className={c.loader} />
            :
               <input
                  accept='.jpg,.jpeg,.png,.webp'
                  type="file"
                  name="image"
                  ref={inputRef}
                  onChange={loadImg}
               />
            }
            <Img
               id='img'
               src={loadedImg || DefaultImage}
               onClick={() => {inputRef.current?.click()}}
            />
         </div>
		</div>
	)
}

export { NewsImage }