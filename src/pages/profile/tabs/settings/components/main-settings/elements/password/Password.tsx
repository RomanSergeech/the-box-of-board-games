import { Button, ErrorTooltipWrapper, Input, Loader } from '@/shared/UI'
import { useModal, useWindowWidth } from '@/shared/lib/hooks'
import { useForm, useTextField } from '@/shared/lib/hooks/form'
import { atLeastOneChar, atLeastOneLetter, atLeastOneNum, equalityTest, maxLength, minLength, required, withoutSpaces } from '@/shared/lib/utils/form-validators'
import { useAuthStore } from '@/shared/store/auth'
import { useUserStore } from '@/shared/store/user'
import { classNames, showAlert } from '@/shared/lib/utils'
import { VerificationModal } from '@/widgets'

import c1 from './password.module.scss'
import c2 from '../../../../settingsTab.module.scss'

const Password = () => {

   const { activeModal, openModal, closeModal, triggerRef, modalBodyRef, modalRef } = useModal()

   return (<>
      <div className={c2.setting} >
         <p className={c2.text} >Изменить пароль</p>

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
         NextStepForm={<NewPasswordModal closeModal={closeModal} />}
         modalWrapperClassName={c1.modal_wrapper}
      />
   </>)
}

interface NewPasswordModalProps {
   closeModal: () => void
}
const NewPasswordModal = ({ closeModal }: NewPasswordModalProps) => {

   const password = useTextField([
      required('Сюда тоже что-нибудь введите'),
      withoutSpaces('Пробелы нельзя'),
      atLeastOneLetter('Введи хотя бы одну букву'),
      atLeastOneChar('Введи хотя бы один спец символ'),
      atLeastOneNum('Введи хотя бы одну цифру'),
      minLength(10),
      maxLength(30)
   ], undefined, true)

   const repeatPassword = useTextField([
      required('Сюда тоже что-нибудь введите'),
      equalityTest([password.value, 'Пароли не совпадают'])
   ])

   const form = useForm({
      fields: [password, repeatPassword],
      apiCall,
      onSuccess: () => {
         closeModal()
         showAlert({
            text: ['Пароль успешно изменен'],
            textBtn: 'Закрыть'
         }, 2000)
      }
   })

   function apiCall() {
      return useAuthStore.getState().changePassword({
         email: useUserStore.getState().email,
         password: password.value
      })
   }

   const windowWidth = useWindowWidth()

   return (
      <form
         role="form"
         className={classNames(c1.change_password_form)}
         onSubmit={form.handleFormSubmit}
      >

         <div className={c1.loader_wrapper} >{
            form.isSending && <Loader data-testid='loader' fontSize={20} />
         }</div>

         {form.sendingError && <span className={c1._err} >{form.sendingError}</span>}

         <ErrorTooltipWrapper
            orientation={windowWidth < 1000 ? '_bottom' : '_right'}
            isActive={!!password.errorMsg}
            tooltipBody={<p>{password.errorMsg}</p>}
         >
            <Input
               data-testid='password'
               type='text'
               name='password'
               autoComplete="off"
               tabIndex={6}
               className={c2.password}
               placeholder='Сюда введите новый пароль'
               value={password.value}
               onChange={password.handleChange}
               onBlur={password.handleBlur}
            />
         </ErrorTooltipWrapper>

         <ErrorTooltipWrapper
            orientation={windowWidth < 1000 ? '_bottom' : '_right'}
            isActive={!!repeatPassword.errorMsg}
            tooltipBody={<p>{repeatPassword.errorMsg}</p>}
         >
            <Input
               data-testid='repeatPassword'
               type='text'
               name='repeatPassword'
               autoComplete="off"
               tabIndex={7}
               placeholder='Повторите новый пароль'
               value={repeatPassword.value}
               onChange={repeatPassword.handleChange}
               onBlur={repeatPassword.handleBlur}
            />
         </ErrorTooltipWrapper>
         
         <Button
            type="submit"
            tabIndex={10}
            disabled={form.isSending ? true : false}
         >
            Подтвердить
         </Button>

      </form>
   )
}

export { Password }