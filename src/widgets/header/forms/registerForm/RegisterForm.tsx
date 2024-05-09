import { useState } from "react"
import { useForm, useTextField, useShowHidePassword, useFormCheckbox } from "@/shared/lib/hooks/form"
import { atLeastOneChar, atLeastOneLetter, emailTest, equalityTest, maxLength, minLength, nicknameTest, atLeastOneNum, required, withoutSpaces } from "@/shared/lib/utils/form-validators"
import { Button, Checkbox, ErrorTooltipWrapper, Input, Loader } from "@/shared/UI"
import { useAuthStore } from "@/shared/store/auth"
import { classNames } from "@/shared/lib/utils"
import { useWindowWidth } from "@/shared/lib/hooks"
import { ConfirmEmailForm } from "../confirmEmailForm/ConfirmEmailForm"

import c1 from './registerForm.module.scss'
import c2 from '../forms.module.scss'

const RULES_URL = import.meta.env.VITE_DOCUMENTS_SUBDOMEN_URL + '/rules'

interface RegisterFormProps {
   onFocus: () => void
}
const RegisterForm = ({ onFocus }: RegisterFormProps) => {

   const [confirmEmail, setConfirmEmail] = useState(false)

   const email = useTextField([
      required('Сюда тоже что-нибудь введите'),
      emailTest('Не похоже на email')
   ])

   const nickname = useTextField([
      required('Сюда тоже что-нибудь введите'),
      minLength(2),
      maxLength(16),
      nicknameTest('Только буквы, цифры и _ , -')
   ])

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

   const checkbox = useFormCheckbox([required('Правила то нужно было прочитать')])

   const form = useForm({
      fields: [email, nickname, password, repeatPassword, checkbox],
      apiCall,
      onSuccess: () => {
         setConfirmEmail(true)
      }
   })

   function apiCall() {

      return useAuthStore.getState().sendActivationCode({
         email: email.value,
         nickname: nickname.value
      }, {
         registration: true
      })

   }

   const { inputType, ShowHidePasswordSvgElement } = useShowHidePassword()

   const windowWidth = useWindowWidth()

   if ( confirmEmail ) {
      return <ConfirmEmailForm
         email={email.value}
         password={password.value}
         nickname={nickname.value}
         setConfirmEmail={setConfirmEmail}
      />
   }

   return (
      <form
         role="form"
         className={`${c2.form} ${c1.register_form}`}
         onSubmit={form.handleFormSubmit}
      >
         <div className='loader_wrapper'>{
            form.isSending && <Loader data-testid='loader' fontSize={16} />
         }</div>

         {form.sendingError &&
            <span className={classNames(c2.text, c2._err)} >{form.sendingError}</span>
         }

         <ErrorTooltipWrapper
            orientation={windowWidth < 1000 ? '_bottom' : '_left'}
            isActive={!!email.errorMsg}
            tooltipBody={<p>{email.errorMsg}</p>}
         >
            <Input
               data-testid='email'
               type='email'
               name='email'
               autoComplete="email"
               tabIndex={4}
               placeholder='Сюда введите вашу почту'
               value={email.value}
               onChange={email.handleChange}
               onBlur={email.handleBlur}
               onFocus={onFocus}
            />
         </ErrorTooltipWrapper>

         <ErrorTooltipWrapper
            orientation={windowWidth < 1000 ? '_bottom' : '_right'}
            isActive={!!nickname.errorMsg}
            tooltipBody={<p>{nickname.errorMsg}</p>}
         >
            <Input
               data-testid='nickname'
               type='text'
               name='nickname'
               autoComplete="off"
               tabIndex={5}
               placeholder='Сюда введите ваш никнейм'
               value={nickname.value}
               onChange={nickname.handleChange}
               onBlur={nickname.handleBlur}
               onFocus={onFocus}
            />
         </ErrorTooltipWrapper>

         <ErrorTooltipWrapper
            orientation={windowWidth < 1000 ? '_bottom' : '_left'}
            isActive={!!password.errorMsg}
            tooltipBody={<p>{password.errorMsg}</p>}
         >
            <Input
               data-testid='password'
               type={inputType}
               name='password'
               autoComplete="off"
               tabIndex={6}
               className={c2.password}
               placeholder='Сюда введите ваш пароль'
               value={password.value}
               onChange={password.handleChange}
               onBlur={password.handleBlur}
               onFocus={onFocus}
            />
            {/* <GeneratePassword
               handleChange={password.handleChange}
               setInputType={setInputType}
            /> */}
            <ShowHidePasswordSvgElement />
         </ErrorTooltipWrapper>

         <ErrorTooltipWrapper
            orientation={windowWidth < 1000 ? '_bottom' : '_right'}
            isActive={!!repeatPassword.errorMsg}
            tooltipBody={<p>{repeatPassword.errorMsg}</p>}
         >
            <Input
               data-testid='repeatPassword'
               type={inputType}
               name='repeatPassword'
               autoComplete="off"
               tabIndex={7}
               placeholder='Повторите пароль'
               value={repeatPassword.value}
               onChange={repeatPassword.handleChange}
               onBlur={repeatPassword.handleBlur}
               onFocus={onFocus}
            />
         </ErrorTooltipWrapper>

         <ErrorTooltipWrapper
            orientation={windowWidth < 1000 ? '_bottom' : '_left'}
            isActive={!!checkbox.errorMsg}
            className={c1.checkbox_wrapper}
            tooltipBody={<p>{checkbox.errorMsg}</p>}
         >
            <Checkbox
               data-testid='checkbox'
               id='register_form_checkbox'
               name='registerFormCheckbox'
               tabIndex={8}
               checked={checkbox.isActive}
               onChange={checkbox.handleChange}
               onFocus={onFocus}
            />
            <span>
               Я прочитал <a
                  href={RULES_URL}
                  target="_blank"
                  tabIndex={9}
               >
                  Правила сайта
               </a> и принимаю их
            </span>
         </ErrorTooltipWrapper>

         <Button
            type="submit"
            tabIndex={10}
            disabled={form.isSending ? true : false}
            onFocus={onFocus}
         >
            Подтвердить
         </Button>

      </form>
   )
}

export { RegisterForm }