import { useState, FormEventHandler } from 'react'

export type TDefaultField = {
   errorMsg: null | string
   reset: () => void
   hasError: () => Promise<boolean>
}

export const useForm = <Field extends TDefaultField>(props: {
   fields: Field[],
   apiCall: () => Promise<unknown>
   onSuccess?: (res: unknown) => void
   onFail?: (err: string) => void
}): {
   isSending: boolean
   sendingError: string
   hasFieldErrors: boolean
   handleFormSubmit: FormEventHandler<HTMLFormElement>
   resetAll: () => void
} => {

   const { fields, apiCall, onSuccess, onFail } = props

   const [isSending, setIsSending] = useState(false)
   const [sendingError, setSendingError] = useState('')

   const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault()

      const errors = await Promise.all(fields.map(field => field.hasError()))
      const isFormValid = errors.every(error => !error)

      if (isFormValid) {
         setIsSending(true)
         setSendingError('')

         try {
            const data = await apiCall()
            onSuccess?.(data)
         }
         catch (err) {
            const msg = err instanceof Error
               ? err?.message
               : 'Что-то пошло не так, попробуйте ещё раз'

            setSendingError(msg)
            onFail?.(msg)
         }
         finally {
            setIsSending(false)
         }
      }
   }

   const resetAll = () => {
      fields.forEach(field => {
         field.reset()
      })
   }

   const hasFieldErrors = fields.some(field => !!field.errorMsg)

   return {
      isSending,
      sendingError,
      hasFieldErrors,
      handleFormSubmit,
      resetAll
   }

}