import { describe, expect, test } from 'vitest'
import { validate } from '../validate/validate'
import { required } from './required'

describe('Validator: required', () => {

	const MESSAGE = 'Message on error'

	const validator = async ( value: string ) => await validate(value, [required(MESSAGE)])

	test('Given empty string', async () => {

		const value = ''
		
		expect(await validator(value)).toBe(MESSAGE)
	})

	test('Given not empty string', async () => {

		const value = 'Value'
		
		expect(await validator(value)).toBe(null)
	})

})