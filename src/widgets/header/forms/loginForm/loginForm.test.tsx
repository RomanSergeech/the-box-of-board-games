// import { render } from '@testing-library/react'
import { describe, vi } from 'vitest'
// import { LoginForm } from './LoginForm'
// import { expectToBeInTheDocument } from '@tests/utils'
// import { BrowserRouter } from 'react-router-dom'

vi.mock('axios', async () => {
   const actual = await vi.importActual("axios") as any
   return {
      ...actual,
      create: vi.fn(() => ({
         // get: vi.fn(),
         // post: vi.fn(),
         interceptors: {
            request: { use: vi.fn(), reject: vi.fn() },
            response: { use: vi.fn(), reject: vi.fn() }
         }
      }))
   }
})

describe('LoginForm', () => {
   // let response;

   // beforeEach(() => {
   //    response = {
   //       data: {
   //          message: 'msg'
   //       }
   //    }
   // })

	// test('Check elements', () => {
	// 	const {
	// 		getByRole,
	// 		queryByTestId
	// 	} = render(<BrowserRouter><LoginForm /></BrowserRouter>)

	// 	const form = getByRole('form')

	// 	const emailInput = queryByTestId('email')
	// 	const passwordInput = queryByTestId('password')
	// 	const forgotPassword = queryByTestId('forgotPassword')
	// 	const btn = getByRole('button')

	// 	const loader = queryByTestId('loader')
	// 	// const errorText = queryByTestId('errorText')

   //    expectToBeInTheDocument([
   //       form,
   //       emailInput,
   //       passwordInput,
   //       forgotPassword,
   //       btn
   //    ])

	// 	expect(loader).toBeNull()
	// 	// expect(errorText).toHaveTextContent('')
	// })

})
