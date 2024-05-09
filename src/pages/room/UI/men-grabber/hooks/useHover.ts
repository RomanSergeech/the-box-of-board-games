import { useEffect, useRef, useState } from "react"

export const useHover = (): any => {
	const ref = useRef();
	const [hovered, setHovered] = useState(false);
 
	const enter = () => setHovered(true);
	const leave = () => setHovered(false);
 
	useEffect(
		() => {
			const reff: any = ref.current
			reff.addEventListener("mouseenter", enter);
			reff.addEventListener("mouseleave", leave);
			return () => {
				reff.removeEventListener("mouseenter", enter);
				reff.removeEventListener("mouseleave", leave);
			};
		},
		[ref]
	);
 
	return [ref, hovered];
};