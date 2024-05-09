import { useState } from "react"

export const useShowHidePassword = () => {

	const [inputType, setInputType] = useState('password')

	const SvgElement = () => (
		<div
			className="show_hide_password"
			onClick={() => setInputType(prev => prev === 'password' ? 'text' : 'password')}
		>
			{inputType === 'text'
				? <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none"  color="#000000"><path d="M12 14a2 2 0 100-4 2 2 0 000 4z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M21 12c-1.889 2.991-5.282 6-9 6s-7.111-3.009-9-6c2.299-2.842 4.992-6 9-6s6.701 3.158 9 6z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
				: <svg width="24px" height="24px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none"  color="#000000"><path d="M19.5 16l-2.475-3.396M12 17.5V14M4.5 16l2.469-3.388M3 8c3.6 8 14.4 8 18 0" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>}
		</div>
	)

	return {
		inputType,
      setInputType,
		ShowHidePasswordSvgElement: SvgElement
	}

}