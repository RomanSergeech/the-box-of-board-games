import { useAlertStore } from "@/shared/store/alert"

export const isUploadAllowed = (file: Blob): boolean => {

	//  Проверка разрешения изображения  //
	if (file.type !== 'image/jpeg' && file.type !== 'image/png') return false


	const lastUpload = localStorage.getItem('image') || 0
	
	//  Проверка не загружал ли пользователь недавно изображение  //
	if ( Date.now() - +lastUpload < 10000 ) {

		useAlertStore.getState().activateAlert({
			text: ['Попробуйте через 10 секунд'],
			textBtn: 'Хорошо'
		})

		setTimeout(() => {
			useAlertStore.getState().closeAlert()
		}, 4000)

		return false
	}

	return true
}