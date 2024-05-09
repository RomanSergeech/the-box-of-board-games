import { Link } from "react-router-dom"

import './homeTab.scss'


const HomeTab = () => {

   const text = (
      <svg width="34" height="24" viewBox="2 0 36 28" fill="none" ><g filter="url(#filter0_d_74_738)"><path d="M19.9999 4.43071L27.9999 11.8425V24.706H24.7999V14.8237H15.1999V24.706H11.9999V11.8425L19.9999 4.43071ZM19.9999 0.00012207L3.99988 14.8237H8.79988V28.0001H18.3999V18.1178H21.5999V28.0001H31.1999V14.8237H35.9999L19.9999 0.00012207Z" fill="white"/></g><defs><filter id="filter0_d_74_738" x="-0.00012207" y="0.00012207" width="40" height="36" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_74_738"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_74_738" result="shape"/></filter></defs></svg>
   )

   const className = 'bg'

	return (
		<li className='home_tab' >
			<Link to="/home" className={className} >{text}</Link>
		</li>
	)
}

export { HomeTab }