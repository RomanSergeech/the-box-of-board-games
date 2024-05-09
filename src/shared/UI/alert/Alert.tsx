import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useAlertStore } from "@/shared/store/alert"
import { classNames } from "@/shared/lib/utils"
import { Button } from "../buttons/button/Button"

import c from './alert.module.scss'

const Alert = () => {

	const store = useAlertStore()

	const [elClass, setElClass] = useState('')

	useEffect(() => {
		if (store.active && store.active !== null) {
			setElClass('_show')
		} else if (store.active !== null) {
			setElClass('_hide')
		}
	}, [store])

   const buttonHandler = () => {
      store.closeAlert()
      store.onClickAction()
   }

	return createPortal (

		<div className={classNames(c.alert, elClass, store.fixed ? '_fixed' : '')} >
			<div className={c.text} >
				{store.svg === null && <svg width="25" height="25" viewBox="0 0 20 20" fill="none" ><path d="M9 13H11V15H9V13ZM9 5H11V11H9V5ZM9.99 0C4.47 0 0 4.48 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 9.99 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18Z" fill="#ffffff"/></svg>}
				<div>
               {store.text.map(line => (
                  <p key={line} >{line}</p>
               ))}
            </div>
			</div>
			{store.textBtn &&
				<Button
               borderColor="main"
               textColor="main"
               onClick={buttonHandler}
            >
               {store.textBtn}
            </Button>
			}
		</div>

	, document.body)
}

export { Alert }