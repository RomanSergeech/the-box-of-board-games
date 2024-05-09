import type { TGetValidator } from "../validate/validate"


const EMAIL_REGEX = /^[^\s][A-Z0-9._%+-]+@[^\s][A-Z0-9-]+.+.[^\s][A-Z]{2,4}$/i


export const emailTest: TGetValidator<string, string> = ( message ) => {

	return async ( value ) => {

		if ( !value ) return message

		return EMAIL_REGEX.test(value) ? null : message
	}

}