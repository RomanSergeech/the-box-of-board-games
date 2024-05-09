import { useForm, useTextField } from "@/shared/lib/hooks/form"
import { required, activationCodeTest } from "@/shared/lib/utils/form-validators"
import { Button, ErrorTooltipWrapper, Input, Loader } from "@/shared/UI"
import { useAuthStore } from "@/shared/store/auth"
import { classNames } from "@/shared/lib/utils"
import { useWindowWidth } from "@/shared/lib/hooks"
import { useNavigate } from "react-router-dom"

import c1 from './confirmEmailForm.module.scss'
import c2 from '../forms.module.scss'

interface RegisterFormProps {
   email: string
   nickname: string
   password: string
   setConfirmEmail: ( confirm: boolean ) => void
}
const ConfirmEmailForm = ({ setConfirmEmail, ...authData }: RegisterFormProps) => {

   const navigate = useNavigate()

   const code = useTextField([
      required('Здесь должен быть код'),
      activationCodeTest('6 цифр')
   ])

   const form = useForm({
      fields: [code],
      apiCall,
      onSuccess: () => {
         useAuthStore.getState().registration(authData)
            .then(() => {
               navigate('/home')
            })
      },
      // onFail: () => {
      //    showAlert({
      //       text: ['Что-то пошло не так'],
      //       textBtn: ''
      //    }, 2000)
      // }
   })

   function apiCall() {
      return useAuthStore.getState().confirmActivationCode({
         email: authData.email,
         code: code.value
      }, {
         registration: true
      })
   }

   const windowWidth = useWindowWidth()

   return (
      <form
         role="form"
         className={classNames(c2.form, c1.confirm_email_form)}
         onSubmit={form.handleFormSubmit}
      >

         <div className={c1.text} >
            <p>Мы отправили код подтверждения на вашу почту</p>
            <p className={c1.email} >{authData.email}</p>
            <span>(Код действует 2 минуты, затем можете запросить его еще раз)</span>
            <button
               type='button'
               onClick={() => setConfirmEmail(false)}
            >
               Вернуться к форме
            </button>
         </div>

         <div className='loader_wrapper'>{
            form.isSending && <Loader data-testid='loader' fontSize={16} />
         }</div>

         {form.sendingError &&
            <span className={classNames(c2.text, c2._err)} >{form.sendingError}</span>
         }

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

         <Button
            type="submit"
            tabIndex={10}
            disabled={form.isSending ? true : false}
            // onFocus={onFocus}
         >
            Создать аккаунт
         </Button>

      </form>
   )
}

export { ConfirmEmailForm }