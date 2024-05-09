import { expect, test, describe, vi } from "vitest"
import { render, renderHook } from "@testing-library/react"
import { useTextField } from "./useTextField"
import { Input } from "@/shared/UI"
import { userEvent } from '@testing-library/user-event'


describe('useTextField', () => {

   const inputTestId = 'input_1'
   const initialValue = 'initial value'

   test('should return a text field object with initial value', () => { 

      const textField = renderHook(() => useTextField([], initialValue))

      expect(textField.result.current.errorMsg).toBe(null)
      expect(textField.result.current.value).toBe(initialValue)
   })

   test('handle change textField value', async () => {

      const textField = renderHook(() => useTextField([]))

      const onChange = vi.fn(textField.result.current.handleChange)

      const { getByTestId } = render(
         <Input
            data-testid={inputTestId}
            value={textField.result.current.value}
            onChange={onChange}
         />
      )

      const input = getByTestId(inputTestId) as HTMLInputElement

      await userEvent.type(input, 'text')

      // expect(onChange).toBeCalledWith('t')
      // expect(onChange).toBeCalledWith('e')
      // expect(onChange).toBeCalledWith('x')
      // expect(onChange).toBeCalledWith('t')

      // expect(input.value).toBe('text')
      // expect(textField.result.current.value).toBe('text')
   })

});