import { describe, expect, test } from 'vitest'
import { getValidUrl } from './getValidUrl'



describe('util getValidUrl', () => {

   test('Given string UrlToValidState', async () => {
		expect(getValidUrl('UrlToValidState')).toBe('url-to-valid-state')
	})

   test('Given string with numbers Url1To2Valid3State', async () => {
		expect(getValidUrl('Url1To2Valid3State')).toBe('url1-to2-valid3-state')
	})

   test('Given empty string', async () => {
		expect(getValidUrl('')).toBe('')
	})

})