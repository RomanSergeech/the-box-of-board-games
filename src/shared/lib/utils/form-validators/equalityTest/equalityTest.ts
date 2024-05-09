import type { TGetValidator } from "../validate/validate"


export const equalityTest: TGetValidator<[string, string], string> = ([ str, message ]) => {

	return async ( value ) => {

		if ( !value ) return message

		return value === str ? null : message
	}

}