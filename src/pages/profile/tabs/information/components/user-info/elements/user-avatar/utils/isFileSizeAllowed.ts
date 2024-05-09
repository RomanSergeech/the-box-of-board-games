import { useAlertStore } from "@/shared/store/alert"

export const isFileSizeAllowed = ( file: Blob ): boolean => {

	if ( file && file.size / 1024 / 1024 >= 10 ) {

		useAlertStore.getState().activateAlert({
         text: ['Файл дожен быть меньше 10 MB'],
         textBtn: 'Я понял'
      })
   
      setTimeout(() => {
         useAlertStore.getState().closeAlert()
      }, 4000)

		return false
	}

	return true
}