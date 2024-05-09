import { useAlertStore } from "@/shared/store/alert"

import type { TAlert } from "@/shared/store/alert"

export const showAlert = ( alert: TAlert, time: number | 'fixed', onClickAction: () => void = ()=>{} ) => {

   const activateAlert = useAlertStore.getState().activateAlert
   const closeAlert = useAlertStore.getState().closeAlert

   activateAlert(alert)

   const timeout = useAlertStore.getState().timer
   if (timeout) clearTimeout(timeout)

   if ( time === 'fixed' ) {
      useAlertStore.setState({ fixed: true, onClickAction })
      return
   }

   const timer = setTimeout(() => {
      closeAlert()
   }, time)

   useAlertStore.setState({
      timer,
      onClickAction
   })

}
