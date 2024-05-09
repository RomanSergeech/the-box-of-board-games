import { describe, expect, test } from 'vitest'
import { validate } from '../validate/validate'
import { emailTest } from './emailTest'

describe('Validator: emailTest', () => {

	const MESSAGE = 'Message on error'

	const validator = async ( value: string ) => await validate(value, [emailTest(MESSAGE)])

	test('Given empty string', async () => {

		const value = ''

		expect(await validator(value)).toBe(MESSAGE)
	})

	test('Given just string', async () => {

		const value = 'Value'

		expect(await validator(value)).toBe(MESSAGE)
	})

	test('Given not valid email: mail@mail', async () => {

		const value = 'mail@mail'

		expect(await validator(value)).toBe(MESSAGE)
	})

	test('Given not valid email: mail@mail.c', async () => {

		const value = 'mail@mail.c'

		expect(await validator(value)).toBe(MESSAGE)
	})

	test('Given valid email: mail@mail.com', async () => {

		const value = 'mail@mail.com'

		expect(await validator(value)).toBe(null)
	})

})