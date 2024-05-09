import { useState, useRef } from 'react'
import { Button, Checkbox } from '@/shared/UI'
import { useOutsideClick } from '@/shared/lib/hooks'
import { classNames } from '@/shared/lib/utils'
import { Games } from './Games'

import type { TFilters } from '../../homePage.types'

import c from './filter.module.scss'


interface ActiveGamesFilterProps {
	choosedFilters: TFilters
	filterGamesHandler: ( data: Partial<TFilters> ) => void
	resetFilters: () => void
}

const Filter = ({ choosedFilters, filterGamesHandler, resetFilters }: ActiveGamesFilterProps) => {

	const [openedPopup, setOpenedPopup] = useState(false)

	const triggerRef = useRef<HTMLDivElement>(null)
	const popupRef = useRef<HTMLDivElement>(null)

	const onClose = () => {
		setOpenedPopup(false)
	}

	useOutsideClick({
		elementRef: popupRef,
		triggerRef: triggerRef,
		enabled: openedPopup,
		onOutsideClick: onClose
	})

	return (
		<div className={c.roomsFilter} >

			<span
				className={c.sub_title}
				ref={triggerRef}
				onClick={() => setOpenedPopup(prev => !prev)}
			>
				Фильтры
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" ><g filter="url(#filter0_d_19_144)"><path d="M4 1H20C20.2652 1 20.5196 1.10536 20.7071 1.29289C20.8946 1.48043 21 1.73478 21 2V3.586C20.9999 3.85119 20.8946 4.10551 20.707 4.293L14.292 10.707C14.1048 10.8947 13.9998 11.1489 14 11.414V17.719C14 17.871 13.9653 18.021 13.8987 18.1576C13.832 18.2942 13.735 18.4138 13.6152 18.5073C13.4954 18.6008 13.3558 18.6658 13.2071 18.6973C13.0584 18.7288 12.9044 18.7259 12.757 18.689L10.757 18.189C10.5408 18.1348 10.3488 18.01 10.2117 17.8342C10.0745 17.6585 10 17.4419 10 17.219V11.414C9.99994 11.1488 9.89455 10.8945 9.707 10.707L3.292 4.293C3.10482 4.10534 2.99979 3.85105 3 3.586V2C3 1.73478 3.10536 1.48043 3.29289 1.29289C3.48043 1.10536 3.73478 1 4 1Z" fill="white"/></g><defs><filter id="filter0_d_19_144" x="0" y="0" width="24" height="23.719" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="2"/><feGaussianBlur stdDeviation="1.5"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_19_144"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_19_144" result="shape"/></filter></defs></svg>
			</span>

			<div
				className={classNames(c.popup, openedPopup ? c._active : '')}
				ref={popupRef}
			>
				<ul>
					<b>Игры</b>
					<Games choosedFilters={choosedFilters} filterGamesHandler={filterGamesHandler} />
				</ul>

				<ul className={c.count_players} >
					<b>Количество игроков</b>
					<li>
						<Checkbox
							checked={!choosedFilters.countPlayers.isChecked}
							onChange={() => filterGamesHandler({ countPlayers: { ...choosedFilters.countPlayers, isChecked: false } })}
						/>
						Любое
					</li>
					<li>
						<Checkbox
							checked={choosedFilters.countPlayers.isChecked}
							onChange={() => filterGamesHandler({ countPlayers: { ...choosedFilters.countPlayers, isChecked: true } })}
						/>
						<input
							type="number"
							min="1"
							max="10"
							className={c.num}
							placeholder="1"
							onChange={(e) => filterGamesHandler({ countPlayers: { ...choosedFilters.countPlayers, min: +e.target.value } })}
							value={choosedFilters.countPlayers.min}
						/>
						<span>-</span>
						<input
							type="number"
							min="1"
							max="10"
							className={c.num}
							placeholder="10"
							onChange={(e) => filterGamesHandler({ countPlayers: { ...choosedFilters.countPlayers, max: +e.target.value } })}
							value={choosedFilters.countPlayers.max}
						/>
					</li>
				</ul>

				<ul>
               <Button onClick={resetFilters} >
                  Сбросить фильтры
               </Button>
				</ul>

			</div>
		</div>
	)
}

export { Filter }