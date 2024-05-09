import { describe, expect, test } from 'vitest'
import { validate } from '../validate/validate'
import { nicknameTest } from './nicknameTest'

describe('Validator: nicknameTest', () => {

	const MESSAGE = 'Message on error'

	const validator = async ( value: string ) => await validate(value, [nicknameTest(MESSAGE)])

	test('Given empty string', async () => {

		const value = ''

		expect(await validator(value)).toBe(MESSAGE)
	})

	test('Given: User 123', async () => {

		const value = 'User 123'

		expect(await validator(value)).toBe(MESSAGE)
	})

	test('Given: User_$!*...', async () => {

		const value = 'Given: User_$!*...'

		expect(await validator(value)).toBe(MESSAGE)
	})

	test('Given: User_123-Игрок', async () => {

		const value = 'User_123-Игрок'

		expect(await validator(value)).toBe(null)
	})

})