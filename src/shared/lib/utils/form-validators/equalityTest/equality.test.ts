import { describe, expect, test } from 'vitest'
import { validate } from '../validate/validate'
import { equalityTest } from './equalityTest'

describe('Validator: equalityTest', () => {

	const MESSAGE = 'Message on error'

	const STRING = 'qwer123'

	const validator = async ( value: string ) => await validate(value, [equalityTest([STRING, MESSAGE])])

	test('Given empty string', async () => {

		const value = ''

		expect(await validator(value)).toBe(MESSAGE)
	})

	test('Given some string', async () => {

		const value = 'password'

		expect(await validator(value)).toBe(MESSAGE)
	})

	test('Given expected string', async () => {

		const value = 'qwer123'

		expect(await validator(value)).toBe(null)
	})


})