import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { useAuthStore } from '@/shared/store/auth'
import App from '@/app/App'


if ( localStorage.getItem('token') ) {
	useAuthStore.getState().checkAuth()
}

let theme = localStorage.getItem('theme')

if ( theme ) {
   theme = `_${theme}_theme`
} else {
   theme = '_dark_theme'
   localStorage.setItem('theme', 'dark')
}

document.querySelector('body')?.classList.add(theme)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
)
