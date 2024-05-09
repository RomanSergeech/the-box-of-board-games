import { describe, expect, test } from 'vitest'
import { validateOpenId } from './validateOpenId'


describe('util validateOpenId', () => {

   test('Given string of 5 characters', async () => {
		expect(validateOpenId('12345')).toBe(true)
	})

   test('Given string of 10 characters', async () => {
		expect(validateOpenId('1234567890')).toBe(true)
	})

   test('Given string less than 5 characters', async () => {
		expect(validateOpenId('1234')).toBe(false)
	})

   test('Given string more than 10 characters', async () => {
		expect(validateOpenId('12345678901')).toBe(false)
	})

   test('Given empty string', async () => {
		expect(validateOpenId('')).toBe(false)
	})

   test('Given unacceptable simbols', async () => {
		expect(validateOpenId('string_#')).toBe(false)
	})

})