import { useFilterGames } from './hooks/useFilterGames'
import { BackToGameButton, CreateRoomButton, Filter, Rooms } from './components'
import { classNames } from '@/shared/lib/utils'
import { usePageCounter } from '@/shared/lib/hooks/yandex-metrika'

import c from './homePage.module.scss'

const HomePage = () => {

   usePageCounter()

	const { choosedFilters, filteredGames, filterGamesHandler, resetFilters } = useFilterGames()

	return (
		<>
			<div className='top' >
            <h1 className='page_title' >Поиск игр</h1>
			</div>

         <div className={classNames(c.page_body, 'page_body')} >

            <div className={c.btns} >
               <CreateRoomButton isPublic={true} >
                  <span>Создать<br/>открытую комнату</span>
                  <div className='svg_wrapper'>
                     <svg width="15" height="23" viewBox="0 0 15 23" fill="none" ><path d="M5.3046 0V1.67647H0V21.299L5.3046 21.3033V23L14.99 21.2523L15 1.75982L5.3046 0ZM6.91103 10.7301C7.23631 10.7301 7.50002 11.0748 7.50002 11.5C7.50002 11.9253 7.23635 12.2699 6.91103 12.2699C6.5857 12.2699 6.32204 11.9253 6.32204 11.5C6.32199 11.0748 6.58575 10.7301 6.91103 10.7301ZM1.57497 19.718V3.2587H5.3046V19.7211L1.57497 19.718Z" fill="white"/></svg>
                     создать игру
                  </div>
               </CreateRoomButton>

               <CreateRoomButton>
                  <span>Создать комнату<br/>с доступом по ссылке</span>
                  <div className='svg_wrapper'>
                     <svg width="14" height="21" viewBox="0 0 14 21" fill="none" ><path d="M0 0V20.9745L14 21V0H0ZM1.31655 19.5925V1.38451H12.6833V3.87701H12.2335V1.84639H1.76647V19.1525H12.2335V17.1219H12.6833V19.6132L1.31655 19.5925ZM12.2335 6.03059H12.6833V14.9682H12.2335V6.03059ZM3.93155 10.4994C3.93155 10.9008 3.62207 11.2262 3.24032 11.2262C2.85857 11.2262 2.54908 10.9008 2.54908 10.4994C2.54908 10.098 2.85857 9.77256 3.24032 9.77256C3.62207 9.77256 3.93155 10.098 3.93155 10.4994Z" fill="white"/></svg>
                     создать игру
                  </div>
               </CreateRoomButton>

               <BackToGameButton>Вернуться в игру</BackToGameButton>
            </div>


            <div className={classNames(c.body, 'block')} >

               <div className={c.top} >

                  <h2 className='block_title' >Ожидают игры</h2>

                  <Filter
                     choosedFilters={choosedFilters}
                     filterGamesHandler={filterGamesHandler}
                     resetFilters={resetFilters}
                  />

               </div>

               <Rooms filteredGames={filteredGames} />

            </div>

         </div>
		</>
	)
}

export { HomePage }