import { ForwardedRef, RefObject, forwardRef, FormEvent } from "react"
import { maxLength, minLength, nicknameTest } from "@/shared/lib/utils/form-validators"
import { useForm, useTextField } from "@/shared/lib/hooks/form"
import { classNames, getFriendsArr, showAlert } from "@/shared/lib/utils"
import { Button, Loader } from "@/shared/UI"
import { useUserStore } from "@/shared/store/user"

import c from './nickname.module.scss'

interface TFormProps {
	inputRef: RefObject<HTMLInputElement>
	className?: string
	onClose: () => void
}
const ChangeNicknameForm = forwardRef(({ inputRef, className, onClose }: TFormProps, ref: ForwardedRef<HTMLFormElement>) => {

	const nickname = useTextField([
		minLength(2),
		maxLength(16),
		nicknameTest('Только буквы, цифры и _ , -')
	])

	const form = useForm({
		fields: [nickname],
		apiCall
	})

	async function apiCall() {
		const friends = getFriendsArr()

		const lastUpload = localStorage.getItem('name') || 0

		if (Date.now() - +lastUpload < 10000) {
			showAlert({
				text: ['Попробуйте через 10 секунд'],
				textBtn: 'Хорошо'
			}, 4000)
			return Promise.resolve()
		}

		return useUserStore.getState().changeNickname( nickname.value, friends )
					.then(() => {
						localStorage.setItem('name', Date.now().toString())
						onClose()
						form.resetAll()
					})
					.catch(() => {
						showAlert({
							text: ['Никнейм занят']
						}, 2000)
					})
	}

	const onSubmit = ( e: FormEvent<HTMLFormElement> ) => {

		if ( nickname.errorMsg ) {
			showAlert({
				text: [nickname.errorMsg || '']
			}, 2000)
		}

		form.handleFormSubmit(e)
	}

	const close = (e: any) => {
		e.preventDefault()
		onClose()
		form.resetAll()
	}

	return (
		<form
			onSubmit={onSubmit}
			className={classNames(c.form, className)}
			ref={ref}
		>
			<div className={classNames('loader_wrapper', c.loader_wrapper)}>{form.isSending && <Loader fontSize={20} />}</div>

			<input
				type="text"
				name='nickname'
				value={nickname.value}
				onChange={nickname.handleChange}
				onBlur={nickname.handleBlur}
				ref={inputRef}
			/>

			<div className={c.yesNo} >
            <Button borderColor="green" textColor="green" >Подтвердить</Button>
            <Button borderColor="red_light" textColor="red_light" onClick={close} >&#9587;</Button>
			</div>

		</form>
	)
})

export { ChangeNicknameForm }