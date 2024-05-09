import { useEffect, useRef, useState } from "react"

export const usePosition = () => {
	const ref: any = useRef();
	const [position, setPosition] = useState({});

	const handleResize = () => {
		let clientRect = JSON.parse(JSON.stringify(ref.current.getBoundingClientRect()))
		setPosition(clientRect);
	};

   const mouseMove = () => {
      console.log('mouseMove');
      
      handleResize()
      window.removeEventListener('mousemove', mouseMove)
   }

	useEffect(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
		window.addEventListener('scroll', handleResize);
      window.addEventListener('mousemove', mouseMove)

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('scroll', handleResize);
         window.removeEventListener('mousemove', mouseMove)
		}
	}, [ref.current]);

	return [ref, position];
};