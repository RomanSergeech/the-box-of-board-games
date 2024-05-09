import { useState, useCallback, ChangeEvent } from 'react'
import { validate } from '@/shared/lib/utils/form-validators'

import type { TValidationResult, TValidator } from '@/shared/lib/utils/form-validators'
import type { TDefaultField } from '../use-form/useForm'

type TFormCheckbox = Omit<TDefaultField, 'value'> & {
	isActive: boolean
	handleChange: ( e: ChangeEvent<HTMLInputElement> ) => void
}

export const useFormCheckbox = ( validators: TValidator<string|boolean>[] ): TFormCheckbox => {

	const [isActive, setIsActive] = useState(false)
	const [errorMsg, setErrorMsg] = useState<TValidationResult>(null)

	const handleChange = useCallback(
		async ( e: ChangeEvent<HTMLInputElement> ) => {
			const checked = e.target.checked

			setIsActive(checked)

			if ( errorMsg ) {
				setErrorMsg( await validate(checked, validators) )
			}
		},
		[ validators ]
	)

	const hasError = useCallback( async () => {
		const err = await validate(isActive, validators)
		setErrorMsg(err)
		return !!err
	}, [ isActive, validators ] )

	const reset = () => {
		setIsActive(false)
	}

	return {
		isActive,
		errorMsg,
		reset,
		hasError,
		handleChange
	}
}