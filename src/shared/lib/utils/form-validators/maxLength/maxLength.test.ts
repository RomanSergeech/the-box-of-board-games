import { describe, expect, test } from 'vitest'
import { validate } from '../validate/validate'
import { maxLength } from './maxLength'

describe('Validator: maxLength 10', () => {

	const MESSAGE = 'Не более 10 символов'

	const validator = async ( value: string ) => await validate(value, [maxLength(10)])

	test('Given empty string', async () => {

		const value = ''

		expect(await validator(value)).toBe(MESSAGE)
	})

	test('Given 9 length string', async () => {

		const value = '123456789'

		expect(await validator(value)).toBe(null)
	})

	test('Given 10 length string', async () => {

		const value = '1234567890'

		expect(await validator(value)).toBe(null)
	})

	test('Given 11 length string', async () => {

		const value = '12345678901'

		expect(await validator(value)).toBe(MESSAGE)
	})

})