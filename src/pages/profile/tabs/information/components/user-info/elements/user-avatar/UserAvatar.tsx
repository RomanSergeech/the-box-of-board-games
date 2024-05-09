import { ChangeEvent, useRef, useState } from 'react'
import { Avatar, Loader } from '@/shared/UI'
import { useUserStore } from '@/shared/store/user'
import { getResizedImg, isFileSizeAllowed, isUploadAllowed } from './utils'
import { classNames, getFriendsArr, showAlert } from '@/shared/lib/utils'
import { GetUrl } from '@/shared/lib/utils'

import c1 from './userAvatar.module.scss'
import c2 from '../../userInfo.module.scss'

const UserAvatar = () => {

	const avatar = useUserStore(state => state.avatar)
   
	const [loading, setLoading] = useState(false)
	const [loadedImg, setLoadedImg] = useState('')
	const [loadedFile, setLoadedFile] = useState<Blob | null>(null)

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

	const uploadImg = async (): Promise<void> => {

		if ( loadedFile && loadedFile.size / 1024 / 1024 < 10 ) {

			const friends = getFriendsArr()

			useUserStore.getState().uploadAvatar({ file: loadedFile as any }, friends)
				.then(() => {
               localStorage.setItem('image', Date.now().toString())
            })
				.catch(() => {
					showAlert({
						text: ['Произошла непредвиденная ошибка'],
						textBtn: 'Закрыть'
					}, 4000)
				})
				.finally(() => {
					URL.revokeObjectURL(loadedImg)
				})

			setLoadedFile(null)
			setLoadedImg('')
		} else {
			setLoadedFile(null)
			setLoadedImg('')
			showAlert({
				text: ['Произошла непредвиденная ошибка'],
				textBtn: 'Закрыть'
			}, 4000)
		}
	}

	const cancelUpload = () => {
		inputRef.current!.value = ''
		setLoadedFile(null)
		setLoadedImg('')
	}

	return (
		<div className={classNames(c1.avatar_wrapper, c2.user_avatar)} >
			<div className={classNames(c1.avatar, c1._download)} >
            {loading
            ?
               <Loader fontSize={5} className={c1.loader} />
            :
               <input
                  accept='.jpg,.jpeg,.png' type="file" name="avatar"
                  ref={inputRef}
                  onChange={loadImg}
               />
            }
            <Avatar
               id='img'
               src={loadedImg || GetUrl.avatars(avatar)}
               onClick={() => {inputRef.current?.click()}}
            />
         </div>

         {loadedImg && <>
            <div className={c1.tooltip} onClick={uploadImg} >
               <b>Подтвердить</b>
            </div>
            <div className={c1.tooltip} onClick={cancelUpload} >
               <b className={c1.close} >Отмена</b>
            </div>
         </> }
		</div>
	)
}

export { UserAvatar }