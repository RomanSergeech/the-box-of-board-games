import { useRef, useState } from 'react'
import { useUserStore } from '@/shared/store/user'
import { useOutsideClick } from '@/shared/lib/hooks'
import { ChangeNicknameForm } from './ChangeNicknameForm'
import { classNames } from '@/shared/lib/utils'

import c from './nickname.module.scss'

const Nickname = () => {

	const nickname = useUserStore(state => state.nickname)

	const [openedForm, setOpenedForm] = useState(false)

	const inputRef = useRef<HTMLInputElement>(null)
	const formRef = useRef<HTMLFormElement>(null)
	const triggerRef = useRef<HTMLSpanElement>(null)

	const openFormHandler = () => {
		setOpenedForm(prev => !prev)
		inputRef.current?.focus()
	}

	const onClose = () => {
		setOpenedForm(false)
	}

	useOutsideClick({
		elementRef: formRef,
		triggerRef: triggerRef,
		enabled: openedForm,
		onOutsideClick: onClose
	})

	return (
		<div className={c.nickname_wrapper} >

			<ChangeNicknameForm
				ref={formRef}
				inputRef={inputRef}
				className={openedForm ? c._active : ''}
				onClose={onClose}
			/>

			<div className={classNames(c.nickname, !openedForm ? c._active : '')} >
				{nickname}

				<span
					className={c.svg_wrapper}
					ref={triggerRef}
					onClick={openFormHandler}
				>
					<svg width="21" height="22" viewBox="0 0 21 22" fill="none" ><path d="M13.8991 2.828L14.2539 2.47347C15.621 1.10731 17.8367 1.10781 19.2032 2.47459C20.57 3.84169 20.5697 6.058 19.2025 7.42472L18.8491 7.778M13.8991 2.828L4.29312 12.435C4.10557 12.6225 4.00018 12.8768 4.00012 13.142C4.00012 15.6472 6.03096 17.678 8.53612 17.678C8.80132 17.6779 9.05563 17.5725 9.24312 17.385L18.8491 7.778M13.8991 2.828L18.8491 7.778L13.8991 2.828Z" fill="#222222"/><path d="M13.8991 2.828L14.2539 2.47347C15.621 1.10731 17.8367 1.10781 19.2032 2.47459V2.47459C20.57 3.84169 20.5697 6.058 19.2025 7.42472L18.8491 7.778M13.8991 2.828L4.29312 12.435C4.10557 12.6225 4.00018 12.8768 4.00012 13.142M13.8991 2.828L18.8491 7.778M18.8491 7.778L9.24312 17.385C9.05563 17.5725 8.80132 17.6779 8.53612 17.678M4.00012 13.142V13.142C4.00012 15.6472 6.03096 17.678 8.53612 17.678V17.678M4.00012 13.142L0.579107 20.3337C0.527024 20.4432 0.5 20.5629 0.5 20.6842V20.7026C0.5 21.143 0.857011 21.5 1.29741 21.5V21.5C1.43036 21.5 1.5612 21.4668 1.67803 21.4033L8.53612 17.678" stroke="#DED500" strokeLinecap="round" strokeLinejoin="round"/></svg>
				</span>
			</div>

		</div>
	)
}


export { Nickname }