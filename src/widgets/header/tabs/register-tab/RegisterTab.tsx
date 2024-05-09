import { useRef, useState } from "react"
import { RegisterForm } from "../../forms/registerForm/RegisterForm"
import { useOutsideClick } from "@/shared/lib/hooks"
import { classNames } from "@/shared/lib/utils"

import './registerTab.scss'

const RegisterTab = () => {

	const [active, setActive] = useState(false)

	const tabRef = useRef<HTMLDivElement>(null)
	const triggerRef = useRef<HTMLButtonElement>(null)

	const onClose = () => {
		setActive(false)
	}

	useOutsideClick({
		elementRef: tabRef,
		triggerRef,
		enabled: active,
		onOutsideClick: onClose
	})

   const onFocus = () => {
      setActive(true)
   }

	return (
		<div
			className={classNames('register_tab', active ? '_active' : '')}
			ref={tabRef}
		>

			<RegisterForm onFocus={onFocus} />

			<span
				className='register_text'
				ref={triggerRef}
				onClick={() => setActive(prev => !prev)}
			>
				Зарегистрироваться
			</span>
		</div>
	)
}

export { RegisterTab }