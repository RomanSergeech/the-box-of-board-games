import { Button, ErrorTooltipWrapper, Input, Loader, Modal, ToggleButton } from "@/shared/UI"
import { useWindowWidth } from "@/shared/lib/hooks"
import { useForm, useTextField } from "@/shared/lib/hooks/form"
import { classNames, showAlert } from "@/shared/lib/utils"
import { activationCodeTest, maxLength, minLength, required } from "@/shared/lib/utils/form-validators"
import { useAuthStore } from "@/shared/store/auth"
import { useUserStore } from "@/shared/store/user"
import { ReactNode, useEffect, useState } from "react"

import c from './verificationModal.module.scss'

interface VerificationModalProps {
   activeModal: boolean
   modalRef: React.RefObject<HTMLDivElement>
   modalBodyRef: React.RefObject<HTMLDivElement>
   modalClassname?: string
   modalWrapperClassName?: string
   NextStepForm?: ReactNode
   onVerified?: () => void
}
const VerificationModal = ({ activeModal, modalRef, modalBodyRef, modalClassname, modalWrapperClassName, NextStepForm, onVerified }: VerificationModalProps) => {

   const [confirmationType, setConfirmationType] = useState<'password'|'email'>('password')
   const [verificated, setVerificated] = useState(false)
   const [confirmEmailCodeSended, setConfirmEmailCodeSended] = useState(false)

   useEffect(() => {
      if ( verificated ) {
         onVerified?.()
      }
   }, [verificated])

   const password = useTextField([
      required('Обязательное поле'),
      minLength(10),
      maxLength(16)
   ])

   const code = useTextField([
      required('Введите код'),
      activationCodeTest('6 цифр')
   ])

   const form = useForm({
      fields: [confirmationType === 'email' ? code : password],
      apiCall,
      onSuccess: () => {
         setVerificated(true)
      }
   })

   function apiCall() {

      if ( confirmationType === 'email' ) {
         return useAuthStore.getState().confirmActivationCode(
            {
               email: useUserStore.getState().email,
               code: code.value
            },
            { registration: false }
         )
      }

      return useAuthStore.getState().verification({
         email: useUserStore.getState().email,
         password: password.value
      })
   }

   const sendActivationCode = async () => {
      setConfirmEmailCodeSended(true)
      await useAuthStore.getState().sendActivationCode({
         email: useUserStore.getState().email
      }, {
         registration: false
      })
      .then(() => {
         showAlert({
            text: [
               'Мы отправили код на вашу почту.',
               'Введите код подтверждения в течении 2 минут.'
            ],
            textBtn: ''
         }, 4000)
      })
   }

   const windowWidth = useWindowWidth()

   return (
      <Modal
         ref={modalRef}
         active={activeModal}
         className={modalClassname}
         wrapperClassName={modalWrapperClassName}
      >
         <div className={c.modal_body} ref={modalBodyRef}>
            {verificated && NextStepForm
            ?
               NextStepForm
            :
               <form
                  role="form"
                  className={classNames(c.verificcation_form)}
                  onSubmit={form.handleFormSubmit}
               >

                  <div className={c.loader_wrapper} >{
                     form.isSending && <Loader data-testid='loader' fontSize={20} />
                  }</div>

                  {form.sendingError && <span className={c._err} >{form.sendingError}</span>}

                  <p className={c.text} >Подтвердите что вы владелец аккаунта</p>

                  <div className={c.tabs} >
                     {([
                        { id: 'password', text: 'Паролем' },
                        { id: 'email', text: 'Кодом с текущей почты' },
                     ] as { id: typeof confirmationType, text: string }[]).map(button => (
                        <ToggleButton
                           key={button.id}
                           type='button'
                           active={confirmationType === button.id}
                           onClick={() => setConfirmationType(button.id)}
                        >
                           {button.text}
                        </ToggleButton>
                     )) }
                  </div>
                  
                  {confirmationType === 'password'
                  ?
                     <ErrorTooltipWrapper
                        orientation={windowWidth < 1000 ? '_bottom' : '_right'}
                        isActive={!!password.errorMsg}
                        tooltipBody={<p>{password.errorMsg}</p>}
                     >
                        <Input
                           data-testid='password'
                           type='password'
                           name='password'
                           autoComplete="off"
                           tabIndex={2}
                           placeholder='Сюда введите ваш пароль'
                           value={password.value}
                           onChange={password.handleChange}
                           onBlur={password.handleBlur}
                        />

                     </ErrorTooltipWrapper>
                  :
                     <ErrorTooltipWrapper
                        orientation={windowWidth < 1000 ? '_bottom' : '_right'}
                        isActive={!!code.errorMsg}
                        tooltipBody={<p>{code.errorMsg}</p>}
                     >
                        <Input
                           data-testid='code'
                           type='text'
                           name='code'
                           placeholder='Сюда введите код'
                           value={code.value}
                           onChange={code.handleChange}
                           onBlur={code.handleBlur}
                        />
                     </ErrorTooltipWrapper>
                  }
                  
                  <div className={c.buttons} >
                     {confirmationType === 'email' ?
                        <Button
                           type='button'
                           tabIndex={3}
                           borderColor='main'
                           onClick={!confirmEmailCodeSended ? sendActivationCode : ()=>{}}
                           disabled={form.isSending ? true : false}
                           className={c.send_code_button}
                        >
                           Отправить код
                        </Button>
                        :
                           <Button className={c.send_code_button} style={{ opacity: 0 }} >Отправить код</Button>
                     }
                     
                     <Button
                        type="submit"
                        tabIndex={3}
                        disabled={
                           form.isSending || (confirmationType === 'email' && !confirmEmailCodeSended)
                           ? true
                           : false
                        }
                     >
                        Подтвердить
                     </Button>
                  </div>

               </form>
            }
         </div>
      </Modal>
   )
}

export { VerificationModal }