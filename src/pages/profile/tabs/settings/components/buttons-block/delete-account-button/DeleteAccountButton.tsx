import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Modal } from "@/shared/UI"
import { useModal } from "@/shared/lib/hooks"
import { useUserStore } from "@/shared/store/user"
import { showAlert } from "@/shared/lib/utils"

import c from './deleteAccountButton.module.scss'

export const DeleteAccountButton = () => {

   const [isSending, setIsSending] = useState(false)

   const { activeModal, openModal, closeModal, triggerRef, modalBodyRef, modalRef } = useModal()

   const navigate = useNavigate()

   const confirmHandler = async () => {
      setIsSending(true)

      closeModal()

      try {
         await useUserStore.getState().deleteProfile().then(() => {
            navigate('/')
         })
      }
      catch ( err ) {
         const msg = err instanceof Error
            ? err?.message
            : 'Что-то пошло не так, попробуйте ещё раз'

         showAlert({ text: [msg] }, 2000)
      }
      finally {
         setIsSending(false)
      }
   }

   return (<>
      <Button
         textColor="border"
         onClick={openModal}
         disabled={isSending}
         ref={triggerRef}
      >
         {isSending ? 'Удаляем...' : 'Удалить аккаунт'}
      </Button>

      <Modal active={activeModal} ref={modalRef} >
         <div className={c.block} ref={modalBodyRef} >

            <p className={c.title} >
               Аккаунт удалится, если вы нажмете на кнопку <br/>
               Будьте аккуратней
            </p>

            <div className={c.button_wrapper} >
               
               <Button
                  borderColor="red_light"
                  textColor="red_light"
                  onClick={confirmHandler}
               >
                  Подтвердить
               </Button>

               <span className={c.hint} >
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" ><path d="M11.5092 13.1981L1.29483 0.819159M1.29483 0.819159L1.08713 6.74672M1.29483 0.819159L6.47123 0.725427" stroke="#DED500" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  лучше не нажимать
               </span>

            </div>

         </div>
      </Modal>
   </>)
}