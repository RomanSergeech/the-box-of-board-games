import { useState, useCallback, ChangeEvent } from 'react'
import { validate } from '@/shared/lib/utils/form-validators'

import type { TValidationResult, TValidator } from '@/shared/lib/utils/form-validators'
import type { TDefaultField } from '../use-form/useForm'

export type TTextField = TDefaultField & {
	value: string
	handleChange: ( e: ChangeEvent<HTMLInputElement> ) => void
	handleBlur: () => void
}

export const useTextField = ( validators: TValidator<string>[], initialValue: string = '', checkAlways = false ): TTextField => {

	const [value, setValue] = useState(initialValue)
	const [errorMsg, setErrorMsg] = useState<TValidationResult>(null)

	const handleChange = useCallback(
		async ( e: ChangeEvent<HTMLInputElement> ) => {
			const val = e.target.value

			setValue(val)

			if ( errorMsg || checkAlways ) {
				setErrorMsg( await validate(val, validators) )
			}
		},
		[ validators ]
	)

	const handleBlur = useCallback( async () => {
		setErrorMsg( await validate(value, validators) )
	}, [ value, validators ])

	const hasError = useCallback( async () => {
		const err = await validate(value, validators)
		setErrorMsg(err)
		return !!err
	}, [ value, validators ] )

	const reset = () => {
		setValue(initialValue)
	}
 
	return {
		value,
		errorMsg,
		reset,
		hasError,
		handleChange,
		handleBlur
	}
}
