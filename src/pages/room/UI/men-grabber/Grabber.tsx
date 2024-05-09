import { useMousePosition } from './hooks/useMousePosition'
import { usePosition } from './hooks/usePosition'

import menRobberHead from '@/shared/assets/images/room/menRobberHead.svg'
import menRobberOpenHand from '@/shared/assets/images/room/menRobberOpenHand.svg'
import menRobberGrabbedHand from '@/shared/assets/images/room/menRobberGrabbedHand.svg'

const ASSETS: any = {
	head: menRobberHead,
	waiting: menRobberOpenHand,
	stalking: menRobberOpenHand,
	grabbing: menRobberOpenHand,
	grabbed: menRobberGrabbedHand,
	shaka: menRobberOpenHand
}

// Preload images
Object.keys(ASSETS).forEach(key => {
	const img = new Image()
	img.src = ASSETS[key]
});

interface GrabberProps {
	state: any
	// gameOver: any
	extended: any
	onCursorGrabbed: any
}

const Grabber = ({ state, extended, onCursorGrabbed }: GrabberProps) => {
	const mousePos = useMousePosition();
	const [ref, position] = usePosition();
	// const hasCursor = false;

	const x = position.left + position.width * 0.5;
	const y = position.top + position.height * 0.5;
   
	const angle = ''+Math.atan2(mousePos.x - x, -(mousePos.y - y)) * (180 / Math.PI);
   
	const rotation = Math.min(Math.max(parseInt(angle), -75), 75);
	
	const grabberClass = `grabber grabber--${state} ${extended && "grabber--extended"}`;
	const wrapperStyle = { transform: `rotate(${rotation}deg)` };

	let handImageSrc = ASSETS[state];

	return (
		<div className={grabberClass}>
			{/* <div className="grabber__body"></div> */}
         <svg className="grabber__body" width="140" height="129" viewBox="0 0 140 129" fill="none" >
<path d="M31.1999 16.915C50.1848 5.49731 45.9659 2.81918 48.7785 0.704794L89.561 0C89.0922 2.34931 92.0923 8.31649 96.5924 10.5718C105.593 13.9548 119.093 32.1855 124.718 40.878C127.296 48.3958 133.437 67.2373 137.375 82.4609C141.312 97.6844 139.016 106.189 137.375 108.538C133.675 112.246 126.737 120.298 128.17 123.222C128.199 123.259 128.22 123.298 128.234 123.339C128.211 123.301 128.19 123.262 128.17 123.222C124.615 118.611 5.95444 139.857 14.3244 119.815H7.99606C5.65224 112.767 0.9646 96.8387 0.9646 89.5088C0.9646 82.1789 9.87111 54.0342 14.3244 40.878C17.6057 34.2999 25.5747 20.298 31.1999 16.915Z" fill="#012828"/>
<path d="M68 91C57.5693 91 43 42.3333 38 21.5L36 14H104.5L101.5 23.5C92.6667 48.3333 79.5 91 68 91Z" fill="#D9D9D9"/>
<path d="M64 30C46.8 16.4 43.8333 9.33333 44.5 7.5C37.7 9.1 37 17.8333 37.5 22C53.5 30.3333 81.2 43.6 64 30Z" fill="black"/>
<path d="M75.436 30.5C92.636 16.9 95.6027 9.83333 94.936 8C101.736 9.6 102.436 18.3333 101.936 22.5C85.936 30.8333 58.236 44.1 75.436 30.5Z" fill="black"/>
<path d="M63.5 29C64 29 75.5 28.5 76 29C76.5 29.5 79.5 36.5 77 37.5C76.1874 37.825 74.6881 38.3085 73 38.693L77 78L67 89.5L59.5 78L67 39.2089C65.7354 39.0161 64.7874 38.5058 64.5 37.5C64.5 34.7 63.8333 30.6667 63.5 29Z" fill="black"/>
</svg>

			{/* <img className="grabber__face" src={ASSETS.head} /> */}

         <svg className="grabber__face" width="146" height="157" viewBox="0 0 146 157" fill="none" >
<path fillRule="evenodd" clipRule="evenodd" d="M97.888 114.658C94.0278 112.271 66.4087 113.663 53.0817 114.658C46.8778 119.133 46.8778 129.576 46.8778 129.576C49.8777 127.999 51.5823 125.677 54.8802 124.767C67.5417 125.899 83.1823 125.587 97.3333 124.019C101.501 124.822 102.106 127.198 104.781 128.084C104.092 124.603 101.748 117.044 97.888 114.658ZM44.2558 74.8558C46.3238 71.8721 57.353 71.8721 58.0423 72.618C58.5019 74.3586 59.2831 78.2871 58.7316 80.0774C58.1802 81.8676 49.0811 83.3097 44.9451 82.3152C43.7962 81.8179 42.6014 77.2428 44.2558 74.8558ZM116.722 62.9209C116.722 62.9209 94.6632 50.986 94.6632 50.2401C94.6632 49.4941 111.896 50.986 113.964 53.2238C116.032 55.4616 116.722 62.9209 116.722 62.9209Z" fill="#EECEA9"/>
<path d="M14.6778 75.8635C12.6628 73.377 7.439 70.7951 3.57877 76.7625C-1.24651 84.2218 6.33608 105.108 8.40406 107.346C10.0584 109.136 16.9556 111.655 19.16 112.152C17.9899 104.375 17.5488 94.4715 17.1246 85.8917C16.9731 82.8288 14.7782 78.7429 14.6778 75.8635Z" fill="#EECEA9"/>
<path d="M144.201 81.9841C143.098 76.0166 137.441 76.1121 134.635 77.3553C134.471 79.6801 136.327 83.2676 136.062 85.8917C135.042 96.0184 133.104 108.738 131.122 118.12C136.648 120.358 134.407 114.805 140.065 111.075C145.724 107.346 145.58 89.4434 144.201 81.9841Z" fill="#EECEA9"/>
<path d="M53.0817 114.658C66.4087 113.663 94.0278 112.271 97.888 114.658C101.748 117.044 104.092 124.603 104.781 128.084C102.106 127.198 101.501 124.822 97.3333 124.019C83.1823 125.587 67.5417 125.899 54.8802 124.767C51.5823 125.677 49.8777 127.999 46.8778 129.576C46.8778 129.576 46.8778 119.133 53.0817 114.658Z" fill="#7D5F3B"/>
<path d="M58.0423 72.618C57.353 71.8721 46.3238 71.8721 44.2558 74.8558C42.6014 77.2428 43.7962 81.8179 44.9451 82.3152C49.0811 83.3097 58.1802 81.8676 58.7316 80.0774C59.2831 78.2871 58.5019 74.3586 58.0423 72.618Z" fill="black"/>
<path d="M94.6632 50.2401C94.6632 50.986 116.722 62.9209 116.722 62.9209C116.722 62.9209 116.032 55.4616 113.964 53.2238C111.896 50.986 94.6632 49.4941 94.6632 50.2401Z" fill="black"/>
<path d="M55.285 50.2401C55.285 50.986 33.2266 62.9209 33.2266 62.9209C33.2266 62.9209 33.9159 55.4616 35.9839 53.2238C38.0519 50.986 55.285 49.4941 55.285 50.2401Z" fill="black"/>
<path d="M91.684 72.4728C92.3734 71.7269 103.403 71.7269 105.471 74.7106C107.125 77.0976 105.93 81.6726 104.781 82.1699C100.645 83.1645 91.5462 81.7224 90.9947 79.9321C90.4433 78.1419 91.2245 74.2133 91.684 72.4728Z" fill="black"/>
<path fillRule="evenodd" clipRule="evenodd" d="M63.5569 154.671C71.8289 155.267 84.9261 154.919 90.4407 154.671C100.781 150.941 122.563 141.244 126.975 132.293C128.397 129.408 129.819 124.291 131.122 118.12C133.104 108.738 135.042 96.0184 136.062 85.8917L130.104 77.3553C126.38 61.9687 127.609 39.5408 112.713 27.5792C105.1 20.9156 92.6038 17.8605 76.2183 20.1033C58.3433 17.8605 43.4475 20.1033 34.4553 30.5696C21.193 43.5814 20.6198 64.6745 20.6198 76.7625L17.1246 85.8917C17.5488 94.4715 17.9899 104.375 19.16 112.152C20.6148 121.822 22.8428 129.595 26.3333 132.293C27.2014 132.964 28.1308 133.689 29.1111 134.454L29.113 134.455L29.116 134.458L29.1262 134.466C29.7257 134.933 30.3441 135.416 30.9792 135.91C40.8494 143.589 54.7204 154.033 63.5569 154.671ZM97.888 114.658C94.0278 112.271 66.4087 113.663 53.0817 114.658C46.8778 119.133 46.8778 129.576 46.8778 129.576C49.8777 127.999 51.5823 125.677 54.8802 124.767C67.5417 125.899 83.1823 125.587 97.3333 124.019C101.501 124.822 102.106 127.198 104.781 128.084C104.092 124.603 101.748 117.044 97.888 114.658ZM44.2558 74.8558C46.3238 71.8721 57.353 71.8721 58.0423 72.618C58.5019 74.3586 59.2831 78.2871 58.7316 80.0774C58.1802 81.8676 49.0811 83.3097 44.9451 82.3152C43.7962 81.8179 42.6014 77.2428 44.2558 74.8558ZM116.722 62.9209C116.722 62.9209 94.6632 50.986 94.6632 50.2401C94.6632 49.4941 111.896 50.986 113.964 53.2238C116.032 55.4616 116.722 62.9209 116.722 62.9209ZM105.471 74.7106C103.403 71.7269 92.3734 71.7269 91.684 72.4728C91.2245 74.2133 90.4433 78.1419 90.9947 79.9321C91.5462 81.7224 100.645 83.1645 104.781 82.1699C105.93 81.6726 107.125 77.0976 105.471 74.7106ZM33.2266 62.9209C33.2266 62.9209 55.285 50.986 55.285 50.2401C55.285 49.4941 38.0519 50.986 35.9839 53.2238C33.9159 55.4616 33.2266 62.9209 33.2266 62.9209Z" fill="#EECEA9"/>
<path d="M33.2266 13C22.8867 24.935 16.3798 34.1562 14.1474 58.707C13.7523 63.0527 14.4423 69.1098 14.6778 75.8635C14.7782 78.7429 16.9731 82.8288 17.1246 85.8917L20.6198 76.7625C20.6198 64.6745 21.193 43.5814 34.4553 30.5696C43.4475 20.1033 58.3433 17.8605 76.2183 20.1033C92.6038 17.8605 105.1 20.9156 112.713 27.5792C127.609 39.5408 126.38 61.9687 130.104 77.3553L136.062 85.8917C136.327 83.2676 134.471 79.6801 134.635 77.3553C135.039 71.6642 135.122 67.0856 134.78 64.6745C133.401 54.9774 129.057 25.0521 119 16.5C86.5004 -11.1362 48.7838 4.02891 33.2266 13Z" fill="#7D5F3B"/>
<path d="M60 125.763C62.2326 127.799 84.2605 129.885 92 125" stroke="black" strokeWidth="0.5" strokeLinecap="round"/>
<path d="M59.8544 74.4878C60.534 74.4878 68.0097 79.803 59.8544 89.6295C52.4434 98.5592 43.3487 89.3869 43.2803 84.8021M43.2803 84.8021C43.2734 84.3416 43.3576 83.9274 43.5437 83.5824C43.4569 83.9873 43.3691 84.3939 43.2803 84.8021ZM43.2803 84.8021C35.0254 122.746 18.2274 173.922 15 83.5824M74.1262 73V97.1884M65.9709 84.3383C68.6893 80.8108 75.7573 75.8724 82.2816 84.3383M65.9709 84.3383C65.9709 85.5907 65.7377 85.8501 64.6116 85.8501C63.4856 85.8501 63.2524 85.5907 63.2524 84.3383C63.2524 83.0859 63.4856 82.8265 64.6116 82.8265C65.7377 82.8265 65.9709 83.0859 65.9709 84.3383ZM82.2816 84.3383C82.2816 85.5907 82.5148 85.8501 83.6408 85.8501C84.7668 85.8501 85 85.5907 85 84.3383C85 83.0859 84.7668 82.8265 83.6408 82.8265C82.5148 82.8265 82.2816 83.0859 82.2816 84.3383Z" stroke="black" strokeLinecap="round"/>
</svg>




			<div className="grabber__arm-wrapper" ref={ref} style={wrapperStyle}>
				<div className="grabber__arm">
				<img
					className="grabber__hand"
					src={handImageSrc}
					onMouseEnter={onCursorGrabbed}
					width={25}
					height={25}
				/>
				</div>
			</div>
		</div>
	);
};

export { Grabber }