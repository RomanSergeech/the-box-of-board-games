import { describe, expect, test } from 'vitest'
import { arrayFromTo } from './arrayFromTo'

describe('util arrayFromTo', () => {

   test('Array from 0 to 1', async () => {
		expect(arrayFromTo(0, 1)).toEqual([0, 1])
	})

	test('Array from 1 to 5', async () => {
		expect(arrayFromTo(1, 5)).toEqual([1, 2, 3, 4, 5])
	})

   test('Array from 5 to 1 in the wrong direction', async () => {
		expect(arrayFromTo(5, 1)).toEqual([])
	})

   test('Array from -1 to 1 wrong numbers', async () => {
		expect(arrayFromTo(-1, 1)).toEqual([])
	})

})