import { useCallback } from "react"

type RefItem<T> = 
	| ((instance: T | null) => void)
	| React.MutableRefObject<T | null>
	| null
	| undefined	

export const useCombinedRef = <T>( ...refs: RefItem<T>[] ) => {

	return useCallback((element: T | null) => {

		refs.forEach(ref => {
			
			if ( !ref ) return

			if ( typeof ref === 'function' ) {
				ref(element)
			} else {
				ref.current = element
			}

		})

	}, refs)

}