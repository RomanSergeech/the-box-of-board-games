import type { TGetValidator } from "../validate/validate"


const LETTERS_REGEX = /^[^\s]*(?=.*[a-zA-Z]).*$/

export const atLeastOneLetter: TGetValidator<string, string> = ( message ) => {

   return async ( value ) => {

		if ( !value ) return message

		return LETTERS_REGEX.test(value) ? null : message
	}

}


const CHARS_REGEX = /^[^\s]*(?=.*[!@#$%^&*()<>,.?\/[\]{}\-=_\+\|\\]).*$/

export const atLeastOneChar: TGetValidator<string, string> = ( message ) => {

   return async ( value ) => {

		if ( !value ) return message

		return CHARS_REGEX.test(value) ? null : message
	}

}


const NUMS_REGEX = /^[^\s]*(?=.*[0-9]).*$/

export const atLeastOneNum: TGetValidator<string, string> = ( message ) => {

   return async ( value ) => {

		if ( !value ) return message

		return NUMS_REGEX.test(value) ? null : message
	}

}

const SPACES_REGEX = /^[^\s]+$/

export const withoutSpaces: TGetValidator<string, string> = ( message ) => {

   return async ( value ) => {

		if ( !value ) return message

		return SPACES_REGEX.test(value) ? null : message
	}

}