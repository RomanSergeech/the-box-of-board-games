import type { TGetValidator } from "../validate/validate"


export const maxLength: TGetValidator<number, string> = ( charCount = 20 ) => {

	const message = `Не более ${charCount} символов`

	return async ( value ) => {

		if ( value?.length ) {
			return value.length <= charCount ? null : message
		}

		return message
	}

}