import { useMemo, useRef, useState } from "react"
import { useModal, useWindowWidth } from "@/shared/lib/hooks"
import { useForm, useTextField } from "@/shared/lib/hooks/form"
import { activationCodeTest, emailTest, required } from "@/shared/lib/utils/form-validators"
import { useUserStore } from "@/shared/store/user"
import { classNames, showAlert } from "@/shared/lib/utils"
import { Button, ErrorTooltipWrapper, Input, Loader, TooltipHint } from "@/shared/UI"
import { useAuthStore } from "@/shared/store/auth"
import { VerificationModal } from "@/widgets"

import c1 from './email.module.scss'
import c2 from '../../../../settingsTab.module.scss'

const Email = () => {

   const emailStore = useUserStore(state => state.email)

   const hiddenEmail = useMemo(() => {
      return emailStore
         .replace(
            /^(.)(.*)(@.)(.*)(\..*)$/,
            (_, a, b, c, d, e) => a + b.replace(/./g, '*') + c + d.replace(/./g, '*') + e
         )
   }, [emailStore])

   const [showEmail, setShowEmail] = useState(false)

   const { activeModal, openModal, closeModal, triggerRef, modalBodyRef, modalRef } = useModal()

   const showEmailHandler = () => {
      setShowEmail(prev => !prev)
   }

   return (<>
      <div className={c2.setting} >
         
         <p className={classNames(c2.text, c2.mono)} >
            Текущая почта:
            <TooltipHint
               hintText='Показать'
               direction='top'
               onClick={showEmailHandler}
            >
               {showEmail ? emailStore : hiddenEmail}
            </TooltipHint>
         </p>

         <button
            onClick={openModal}
            ref={triggerRef}
         >
            изменить
         </button>
      </div>

      <VerificationModal
         activeModal={activeModal}
         modalRef={modalRef}
         modalBodyRef={modalBodyRef}
         modalWrapperClassName={c1.modal_wrapper}
         NextStepForm={<ConfirmEmailForm closeModal={closeModal} />}
      />
   </>)
}

interface ConfirmEmailFormProps {
   closeModal: () => void
}
const ConfirmEmailForm = ({ closeModal }: ConfirmEmailFormProps) => {

   const [confirmEmailCodeSended, setConfirmEmailCodeSended] = useState(false)
   
   const email = useTextField([
      required('Обязательное поле'),
      emailTest('Не похоже на email')
   ])
   
   const prevEmailRef = useRef(email.value)

   const code = useTextField([
      activationCodeTest('6 цифр')
   ])

   const form = useForm({
      fields: [email, code],
      apiCall,
      onSuccess: () => {
         closeModal()
         useUserStore.setState({ email: email.value.toLocaleLowerCase() })
         showAlert({
            text: ['Почта успешно изменена'],
            textBtn: 'Закрыть'
         }, 2000)
      }
   })

   function apiCall() {
      return useAuthStore.getState().confirmActivationCode(
         {
            email: email.value,
            code: code.value,
            oldEmail: useUserStore.getState().email
         },
         { registration: false }
      )
   }

   const sendActivationCode = async () => {
      if ( email.value.length === 0 ) {
         showAlert({
            text: ['Введите новую Почту.'],
            textBtn: ''
         }, 2000)
         return
      }
      await useAuthStore.getState().sendActivationCode({
         email: email.value
      }, {
         registration: false
      })
      .then(() => {
         setConfirmEmailCodeSended(true)
         prevEmailRef.current = email.value
         showAlert({
            text: [
               'Мы отправили код на вашу Новую Почту.',
               'Введите код подтверждения в течении 2 минут.'
            ],
            textBtn: ''
         }, 4000)
      })
   }

   const windowWidth = useWindowWidth()

   return (
      <form
         role="form"
         className={classNames(c1.change_email_form)}
         onSubmit={form.handleFormSubmit}
      >

         <div className={c1.loader_wrapper} >{
            form.isSending && <Loader data-testid='loader' fontSize={20} />
         }</div>

         {form.sendingError && <span className={c1._err} >{form.sendingError}</span>}

         <ErrorTooltipWrapper
            orientation={windowWidth < 1000 ? '_bottom' : '_right'}
            isActive={!!email.errorMsg}
            tooltipBody={<p>{email.errorMsg}</p>}
         >
            <Input
               data-testid='email'
               type="email"
               name='email'
               autoComplete="email"
               tabIndex={1}
               placeholder='Сюда введите новую почту'
               value={email.value}
               onChange={email.handleChange}
               onBlur={email.handleBlur}
            />
         </ErrorTooltipWrapper>

         <ErrorTooltipWrapper
            orientation={windowWidth < 1000 ? '_bottom' : '_left'}
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
         
         <div className={c1.buttons} >
            <Button
               type='button'
               tabIndex={3}
               borderColor='main'
               onClick={prevEmailRef.current !== email.value ? sendActivationCode : ()=>{}}
               disabled={form.isSending || email.errorMsg || email.value.length === 0 ? true : false}
            >
               Отправить код
            </Button>
            
            <Button
               type="submit"
               tabIndex={3}
               disabled={form.isSending || !confirmEmailCodeSended ? true : false}
            >
               Подтвердить
            </Button>
         </div>

      </form>
   )
}


export { Email }