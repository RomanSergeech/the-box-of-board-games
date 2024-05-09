import { RefObject, useRef } from "react"
import { useOutsideClick } from "@/shared/lib/hooks"
import { LoginForm } from "../../forms/loginForm/LoginForm"
import { RegisterTab } from "../register-tab/RegisterTab"
import { SocialsAuth } from "./components"
import { classNames } from "@/shared/lib/utils"
import { useHeaderStore } from "@/shared/store/header"

import './loginTab.scss'


interface TLoginProps {
	loginTabRef: RefObject<HTMLLIElement>
}
const LoginTab = ({ loginTabRef }: TLoginProps) => {

   const activeMenu = useHeaderStore(state => state.activeMenu)
   const activeLogin = useHeaderStore(state => state.activeLogin)
	const triggerRef = useRef<HTMLDivElement>(null)

	const onClose = () => {
		useHeaderStore.setState({ activeLogin: false })
	}

	useOutsideClick({
		elementRef: loginTabRef,
		triggerRef,
		enabled: activeLogin,
		onOutsideClick: onClose
	})

   const onFocus = ( e: React.FocusEvent<HTMLLIElement, Element> ) => {
      e.currentTarget.classList.add('_active')
   }

   const setActiveLogin = () => {
      useHeaderStore.setState((state) => ({ activeLogin: !state.activeLogin }))
   }

	return (
		<li
         tabIndex={0}
			className={classNames('login_tab', activeLogin ? '_active' : '')}
			ref={loginTabRef}
         onFocus={onFocus}
		>

			<div className={classNames('bg', activeMenu ? '_active_menu' : '')}>

            <span  className='some_text' >Войти с помощью:</span>

            <SocialsAuth />

				<LoginForm />

				<span
					className='login_text'
					ref={triggerRef}
					onClick={setActiveLogin}
				>
					{activeLogin ? 'Отмена' : 'Войти'}
				</span>

				<RegisterTab />

			</div>

		</li>
	)
}

export { LoginTab }