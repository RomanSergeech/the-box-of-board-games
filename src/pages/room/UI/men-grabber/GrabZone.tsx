import { useEffect, useState } from 'react'
import { Grabber } from './Grabber'
import { useHover } from './hooks/useHover'

interface GrabZoneProps {
	cursorGrabbed: any
	// gameOver: any
	onCursorGrabbed: any
}
const GrabZone = ({ cursorGrabbed, onCursorGrabbed }: GrabZoneProps) => {
	const [outerRef, outerHovered] = useHover()
	const [innerRef, innerHovered] = useHover()
	const [isExtended, setExtendedArm] = useState(false)

	let state = "waiting";
	if (outerHovered) {
		state = "stalking";
	}
	if (innerHovered) {
		state = "grabbing";
	}
	if (cursorGrabbed) {
		state = "grabbed";
	}
	// if (gameOver) {
	// 	state = "shaka"
	// }
	// If state is grabbing for a long time, they're being clever!
	useEffect(() => {
		let timer: any;
		if (state === "grabbing") {
			timer = setTimeout(() => {
				setExtendedArm(true);
				timer = null;
			}, 2000);
		}
		return () => {
			setExtendedArm(false);
			if (timer) {
				clearTimeout(timer);
			}
		};
	}, [state] );
 
	return (
		<div className="grab-zone" ref={outerRef}>
			<div className="grab-zone__danger" ref={innerRef}>
				<Grabber
					state={state}
					// gameOver={gameOver}
					extended={isExtended}
					onCursorGrabbed={onCursorGrabbed}
				/>
			</div>
		</div>
	);
};

export { GrabZone }