import type { TGetValidator } from ".."


export const required: TGetValidator<string, string|boolean> = ( message ) => {

	return async ( value ) => (
		value
			? null
			: message
	)

}
