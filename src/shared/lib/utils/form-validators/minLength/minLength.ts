import type { TGetValidator } from "../validate/validate"


export const minLength: TGetValidator<number, string> = ( charCount = 2 ) => {

	const message = `Не менее ${charCount} символов`

	return async ( value ) => {

		if ( value?.length ) {
			return value.length >= charCount
				? null
				: message
		}

		return message
	}

}
