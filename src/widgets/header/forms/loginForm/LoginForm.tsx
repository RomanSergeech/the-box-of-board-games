import { Button, ErrorTooltipWrapper, Input, Loader } from "@/shared/UI"
import { useForm, useShowHidePassword, useTextField } from "@/shared/lib/hooks/form"
import { useAuthStore } from "@/shared/store/auth"
import { emailTest, maxLength, minLength, required } from "@/shared/lib/utils/form-validators"
import { useNavigate } from "react-router-dom"
import { classNames } from "@/shared/lib/utils"
import { useWindowWidth } from "@/shared/lib/hooks"

import c1 from './loginForm.module.scss'
import c2 from '../forms.module.scss'

const LoginForm = () => {

   const navigate = useNavigate()

   const email = useTextField([
      required('Сюда тоже что-нибудь введите'),
      emailTest('Не похоже на email')
   ])

   const password = useTextField([
      required('Сюда тоже что-нибудь введите'),
      minLength(10),
      maxLength(16)
   ])

   const form = useForm({
      fields: [email, password],
      apiCall
   })

   function apiCall() {
      return useAuthStore.getState().login({
         email: email.value,
         password: password.value
      }, () => {
         navigate('/home')
      })
   }

   const { inputType, ShowHidePasswordSvgElement } = useShowHidePassword()

   const windowWidth = useWindowWidth()

   return (
      <form
         role="form"
         className={classNames(c2.form, c1.login_form)}
         onSubmit={form.handleFormSubmit}
      >

         <div className='loader_wrapper' >{
            form.isSending && <Loader data-testid='loader' fontSize={20} />
         }</div>

         {form.sendingError
            ? <span className={classNames(c2.text, c2._err)} >{form.sendingError}</span>
            : <span className={c2.text} >или</span>
         }

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
               placeholder='Сюда введите вашу почту'
               value={email.value}
               onChange={email.handleChange}
               onBlur={email.handleBlur}
            />
         </ErrorTooltipWrapper>

         <ErrorTooltipWrapper
            orientation={windowWidth < 1000 ? '_bottom' : '_right'}
            isActive={!!password.errorMsg}
            tooltipBody={<p>{password.errorMsg}</p>}
         >
            <Input
               data-testid='password'
               type={inputType}
               name='password'
               autoComplete="off"
               tabIndex={2}
               className={c2.password}
               placeholder='Сюда введите ваш пароль'
               value={password.value}
               onChange={password.handleChange}
               onBlur={password.handleBlur}
            />

            <ShowHidePasswordSvgElement />

         </ErrorTooltipWrapper>

         <span
            className={c1.forgot_password}
            data-testid='forgotPassword'
         >
            Не могу войти
         </span>

         <Button
            type="submit"
            tabIndex={3}
            disabled={form.isSending ? true : false}
         >
            Подтвердить
         </Button>

      </form>
   )
}

export { LoginForm }