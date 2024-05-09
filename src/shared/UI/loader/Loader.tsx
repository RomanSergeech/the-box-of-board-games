import { classNames } from '@/shared/lib/utils'

import c from './loader.module.scss'

interface LoaderProps {
	fontSize?: number
	fullScreen?: boolean
   className?: string
}

const Loader = ({ fontSize, fullScreen, className }: LoaderProps) => {
	return (
		<div
         className={classNames(c.loader, fullScreen ? '_fullScreen' : '', className)}
         style={{ fontSize }}
      >
			<span>З</span>
			<span>а</span>
			<span>г</span>
			<span>р</span>
			<span>у</span>
			<span>з</span>
			<span>к</span>
			<span>а</span>
		</div>
	)
}

export { Loader }