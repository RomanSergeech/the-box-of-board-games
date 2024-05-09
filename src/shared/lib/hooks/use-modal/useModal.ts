import { RefObject, useEffect, useRef, useState } from "react"
import { useOutsideClick } from "../use-outside-click/useOutsideClick"


export const useModal = ( triggerElementsRefs?: RefObject<HTMLElement>[] ) => {

   const [activeModal, setActiveModal] = useState(false)

   const triggerRef = useRef<HTMLButtonElement>(null)
	const modalBodyRef = useRef<HTMLDivElement>(null)
	const modalRef = useRef<HTMLDivElement>(null)

   const canClickRef = useRef(true)

   const revivalBack = () => {
      window.onpopstate = null
      window.history.back()
      const body = document.querySelector('body')
      if ( body ) body.classList.remove('_fixed')
   }

   const onClose = () => {
      console.log('onClose', activeModal);

      if ( !canClickRef.current ) return

      if ( modalRef.current ) {
         modalRef.current.classList.add('_hide')
         canClickRef.current = false
      }
		setTimeout(() => {
         setActiveModal(false)
         revivalBack()
         canClickRef.current = true
         const body = document.querySelector('body')
         if ( body ) body.classList.remove('_fixed')
      }, 400)
	}

   const openModal = () => {
      console.log('openModal');

      window.history.pushState(null, "", window.location.href)
      window.onpopstate = () => {
         console.log('onpopstate');
         window.history.pushState(null, "", window.location.href)
         setActiveModal(false)
         revivalBack()
      }
      const body = document.querySelector('body')
      if ( body ) body.classList.add('_fixed')
      
      setActiveModal(true)
   }

   useEffect(() => {
      return () => {
         const body = document.querySelector('body')
         if ( body ) body.classList.remove('_fixed')
      }
   }, [])

	useOutsideClick({
		elementRef: modalBodyRef,
		triggerRef: triggerRef,
		enabled: activeModal,
      triggerElementsRefs,
		onOutsideClick: onClose
	})

   return {
      activeModal,
      openModal,
      closeModal: onClose,
      triggerRef, 
      modalBodyRef,
      modalRef
   }
}