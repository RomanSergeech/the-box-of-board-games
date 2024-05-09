import type { TGetValidator } from "../validate/validate"


const NICKNAME_REGEX = /^[^\s\\][А-Яа-яA-Za-z0-9_-]*$/


export const nicknameTest: TGetValidator<string, string> = ( message ) => {

	return async ( value ) => {

		if ( !value ) return message

		return NICKNAME_REGEX.test(value) ? null : message
	}

}