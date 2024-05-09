import { describe, expect, test } from 'vitest'
import { classNames } from './classNames'


describe('util classNames', () => {

   test('Given 2 strings', async () => {
		expect(classNames('class_1', 'class_2')).toBe('class_1 class_2')
	})

   test('Given 1 string and 1 undefined', async () => {
		expect(classNames('class_1', undefined)).toBe('class_1')
	})

   test('Given 0 strings', async () => {
		expect(classNames()).toBe('')
	})

})