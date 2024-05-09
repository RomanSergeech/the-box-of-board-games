import { describe, test, vi, afterEach } from 'vitest'
// import { fireEvent } from "@testing-library/react"

import React from 'react'

describe("useOutsideClick", () => {
   
   const setState = vi.fn()
   const useStateSpy = vi.spyOn(React, 'useState')
   useStateSpy.mockImplementation(() => [false, setState])

   afterEach(() => {
      vi.clearAllMocks()
   })

   let enabled = false

   test('should handle outside click', () => {

      const target = document.createElement("div")
      document.body.appendChild(target)

      const trigger = document.createElement("button")
      trigger.onclick = () => {
         enabled = !enabled
      }
      document.body.appendChild(trigger)
  
      const outside = document.createElement("div")
      document.body.appendChild(outside)

      // const targetRef = { current: target }
      // const triggerRef = { current: trigger }

      // const onOutsideClick = vi.fn()

      // const view = renderHook(() => useOutsideClick({
      //    elementRef: targetRef,
      //    triggerRef,
      //    // enabled,
      //    onOutsideClick
      // }))

      // expect(onOutsideClick).toHaveBeenCalledTimes(0)
      // fireEvent.click(outside)
      // expect(onOutsideClick).toHaveBeenCalledTimes(1)

      // fireEvent.click(target)
      // expect(onOutsideClick).toHaveBeenCalledTimes(0)

      // fireEvent.click(trigger)
      // expect(onOutsideClick).toHaveBeenCalledTimes(0)
      // expect(enabled).toBeTruthy()

      // fireEvent.click(outside)
      // expect(onOutsideClick).toHaveBeenCalledTimes(1)

      // fireEvent.click(trigger)
      // expect(onOutsideClick).toHaveBeenCalledTimes(0)

      // fireEvent.click(outside)
      // expect(onOutsideClick).toHaveBeenCalledTimes(0)

      // vi.spyOn(document, 'removeEventListener')

      // view.unmount()
      // expect(document.removeEventListener).toHaveBeenCalledTimes(0)

      // fireEvent.click(outside)
      // expect(onOutsideClick).toHaveBeenCalledTimes(1)

   })

})