import type { TGetValidator } from "../validate/validate"


const CODE_REGEX = /^[0-9]{6,6}$/i


export const activationCodeTest: TGetValidator<string, string> = ( message ) => {

	return async ( value ) => {

		if ( !value ) return message

		return CODE_REGEX.test(value) ? null : message
	}

}