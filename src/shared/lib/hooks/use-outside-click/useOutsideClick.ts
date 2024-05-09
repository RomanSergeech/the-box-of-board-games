import { RefObject, useEffect } from "react"
import { useEvent } from ".."

interface TUseOutsideClick {
	elementRef: RefObject<HTMLElement>
	triggerRef?: RefObject<HTMLElement>
	ignoreElementsRefs?: RefObject<HTMLElement>[]
   triggerElementsRefs?: RefObject<HTMLElement>[]
	enabled?: boolean
	onOutsideClick: ( e: MouseEvent | TouchEvent | KeyboardEvent ) => void
}

export const useOutsideClick = ({ elementRef, triggerRef, ignoreElementsRefs, triggerElementsRefs, enabled = true, onOutsideClick }: TUseOutsideClick) => {

	const handleOutsideClick = useEvent( onOutsideClick )

	useEffect(() => {

		if ( !enabled ) return

		const handleClick = ( e: MouseEvent | TouchEvent | KeyboardEvent ) => {
			const target = e.target

         const keyboardEvent = e as KeyboardEvent

         if ( keyboardEvent.key ) {
            if ( keyboardEvent.key === 'Escape' ) {
               handleOutsideClick(e)
            }
            return
         }

			if ( !(target instanceof Node) ) return

			if ( !elementRef.current ) return

			const ignoreElements = [elementRef.current]

			if ( triggerRef?.current ) {
				ignoreElements.push(triggerRef.current)
			}

         ignoreElementsRefs?.forEach(elemRef => {
            if ( elemRef?.current ) ignoreElements.push(elemRef.current)
         } )

         const triggerElements = triggerElementsRefs?.reduce<HTMLElement[]>((acc, elemRef) => {
            if ( elemRef?.current ) acc.push(elemRef.current)
            return acc
         }, [])

			if ( !ignoreElements.some(el => el.contains(target)) || triggerElements?.some(el => el.contains(target)) ) {
            handleOutsideClick(e)
			}
		}

		document.addEventListener('mousedown', handleClick)
		// document.addEventListener('touchstart', handleClick)
      document.addEventListener('keydown', handleClick)

		return () => {
			document.removeEventListener('mousedown', handleClick)
			// document.removeEventListener('touchstart', handleClick)
         document.removeEventListener('keydown', handleClick)
		}

	}, [ elementRef, triggerRef, enabled, handleOutsideClick ])

}