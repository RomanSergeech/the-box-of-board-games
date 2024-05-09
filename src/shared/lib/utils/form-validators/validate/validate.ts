
export type TGetValidator<Options, Params> = ( options: Options ) => TValidator<Params>

export type TValidator<T> = ( params: T ) => Promise<TValidationResult>

export type TValidationResult = string | null


export const validate = async <T>( value: T, validators: TValidator<T>[] ): Promise<TValidationResult> => {

	let validationResult: TValidationResult = null
	let i = 0

	while ( validationResult === null && i < validators.length ) {
		const res = await validators[i]!(value)

		res && ( validationResult = res )

		i++
	}

	return validationResult
}
