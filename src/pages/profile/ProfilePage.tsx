import { useState } from 'react'
import { classNames } from '@/shared/lib/utils'
import { TabButton } from '@/shared/UI'
import { InformationTab, SettingsTab, StatisticsTab } from './tabs'
import { useUserStore } from '@/shared/store/user'

import c from './profilePage.module.scss'

const enum ProfileTabs {
   information = 'information',
   statistics = 'statistics',
   settings = 'settings'
}

const ProfilePage = () => {

	const [activeTab, setActiveTab] = useState<`${ProfileTabs}`>(ProfileTabs.information)

   const allXp = useUserStore.getState().common_statistics?.allXp || 0
   const games = useUserStore.getState().games
   const items = useUserStore.getState().items
   const commonStatistics = useUserStore.getState().common_statistics
   const gamesStatistics = useUserStore.getState().games_statistics || null

   const comments = useUserStore(state => state.comments)
   
	return (
		<>
			<div className='top'>
				<h1 className='page_title' >Профиль</h1>
			</div>

			<div className={classNames(c.page_body, 'page_body')} >

				<div className={c.tab_btns} >

               <TabButton
                  activeTab={activeTab === ProfileTabs.information}
                  onClick={() => setActiveTab(ProfileTabs.information)}
               >
                  <span>Информация</span>
						<svg width="32" height="20" viewBox="0 0 32 20" fill="none" ><path fillRule="evenodd" clipRule="evenodd" d="M2.22222 20C0.995556 20 0 19.0044 0 17.7778V2.22222C0 0.995556 0.995556 0 2.22222 0H28.8889C30.1156 0 31.1111 0.995556 31.1111 2.22222V17.7778C31.1111 19.0044 30.1156 20 28.8889 20H2.22222ZM6.45778 5.47334C6.45778 3.70889 7.54667 2.27889 8.88889 2.27889C10.2311 2.27889 11.32 3.70889 11.32 5.47334C11.32 7.23778 10.2311 8.66778 8.88889 8.66778C7.54667 8.66778 6.45778 7.23778 6.45778 5.47334ZM10.4433 9.25445C10.4433 9.25445 12.1678 9.52 12.7667 9.91889C13.47 10.3867 13.6444 12.4311 13.6444 12.4311H4.07222C4.07222 12.4311 4.33667 10.3167 4.93556 9.91889C5.53333 9.51889 7.25778 9.25445 7.25778 9.25445C7.25778 9.25445 8.37556 10.4489 8.85111 10.4489C9.32556 10.4489 10.4433 9.25445 10.4433 9.25445ZM16.6667 3.59889H26.6667V4.71H16.6667V3.59889ZM16.6667 5.82111H26.6667V6.93222H16.6667V5.82111ZM16.6667 8.04333H26.6667V9.15445H16.6667V8.04333ZM16.6667 10.2656H26.6667V11.3767H16.6667V10.2656ZM7 15H4L4 18H7V15ZM12 15H9L9 18H12V15ZM17 15H14L14 18H17V15Z" fill="white"/></svg>
               </TabButton>

               <TabButton
                  activeTab={activeTab === ProfileTabs.statistics}
                  onClick={() => setActiveTab(ProfileTabs.statistics)}
               >
                  <span>Статистика</span>
						<svg width="32" height="20" viewBox="0 0 32 20" fill="none" ><path fillRule="evenodd" clipRule="evenodd" d="M0 17.7778C0 19.0044 0.995565 20 2.22222 20H28.8889C30.1155 20 31.1111 19.0044 31.1111 17.7778V2.22222C31.1111 0.995557 30.1155 0 28.8889 0H2.22222C0.995565 0 0 0.995557 0 2.22222V17.7778ZM27 14V16H10V14H27ZM27 11V8.99999H10V11H27ZM27 3.99999V5.99999H10V3.99999H27ZM2 3.99999L4.60974 6.99999L9 1.59999L8.36364 0.999992L4.60974 4.49999L2.4201 3.39999L2 3.99999ZM4.60974 12L2 8.99999L2.4201 8.39999L4.60974 9.49999L8.36364 5.99999L9 6.59999L4.60974 12ZM2 14L4.60974 17L9 11.6L8.36364 11L4.60974 14.5L2.4201 13.4L2 14Z" fill="white"/></svg>
               </TabButton>

               <TabButton
                  activeTab={activeTab === ProfileTabs.settings}
                  onClick={() => setActiveTab(ProfileTabs.settings)}
               >
                  <span>Настройки</span>
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" ><path fillRule="evenodd" clipRule="evenodd" d="M8.9 18.5H11.1L11.45 15.7C12 15.5667 12.5208 15.3583 13.0125 15.075C13.5042 14.7917 13.95 14.45 14.35 14.05L17 15.2L18 13.4L15.65 11.675C15.7167 11.3917 15.7708 11.1125 15.8125 10.8375C15.8542 10.5625 15.875 10.2833 15.875 10C15.875 9.71667 15.8583 9.4375 15.825 9.1625C15.7917 8.8875 15.7333 8.60833 15.65 8.325L18 6.6L17 4.8L14.35 5.95C13.9667 5.51667 13.5333 5.15417 13.05 4.8625C12.5667 4.57083 12.0333 4.38333 11.45 4.3L11.1 1.5H8.9L8.55 4.3C7.98333 4.41667 7.45417 4.61667 6.9625 4.9C6.47083 5.18333 6.03333 5.53333 5.65 5.95L3 4.8L2 6.6L4.35 8.325C4.28333 8.60833 4.22917 8.8875 4.1875 9.1625C4.14583 9.4375 4.125 9.71667 4.125 10C4.125 10.2833 4.14583 10.5625 4.1875 10.8375C4.22917 11.1125 4.28333 11.3917 4.35 11.675L2 13.4L3 15.2L5.65 14.05C6.05 14.45 6.49583 14.7917 6.9875 15.075C7.47917 15.3583 8 15.5667 8.55 15.7L8.9 18.5ZM12.3 12.3C11.6667 12.9333 10.9 13.25 10 13.25C9.1 13.25 8.33333 12.9333 7.7 12.3C7.06667 11.6667 6.75 10.9 6.75 10C6.75 9.1 7.06667 8.33333 7.7 7.7C8.33333 7.06667 9.1 6.75 10 6.75C10.9 6.75 11.6667 7.06667 12.3 7.7C12.9333 8.33333 13.25 9.1 13.25 10C13.25 10.9 12.9333 11.6667 12.3 12.3Z" fill="white"/><path fillRule="evenodd" clipRule="evenodd" d="M7.2 16.85L7.7 20H12.3L12.8 16.85C13.1333 16.75 13.4708 16.5958 13.8125 16.3875C14.1542 16.1792 14.4583 15.9667 14.725 15.75L17.675 17.1L20 13L17.3 11.05C17.3333 10.8833 17.3542 10.7083 17.3625 10.525C17.3708 10.3417 17.375 10.1667 17.375 10C17.375 9.83333 17.3708 9.65417 17.3625 9.4625C17.3542 9.27083 17.3333 9.09167 17.3 8.925L20 7L17.675 2.9L14.725 4.25C14.475 4.01667 14.1708 3.80417 13.8125 3.6125C13.4542 3.42083 13.1167 3.26667 12.8 3.15L12.3 0H7.7L7.2 3.175C6.88333 3.275 6.55 3.425 6.2 3.625C5.85 3.825 5.54167 4.03333 5.275 4.25L2.325 2.9L0 7L2.7 8.975C2.66667 9.125 2.64583 9.29583 2.6375 9.4875C2.62917 9.67917 2.625 9.85 2.625 10C2.625 10.15 2.62917 10.3208 2.6375 10.5125C2.64583 10.7042 2.66667 10.875 2.7 11.025L0 13L2.325 17.1L5.275 15.75C5.54167 15.9667 5.85 16.175 6.2 16.375C6.55 16.575 6.88333 16.7333 7.2 16.85ZM11.1 18.5H8.9L8.55 15.7C8 15.5667 7.47917 15.3583 6.9875 15.075C6.49583 14.7917 6.05 14.45 5.65 14.05L3 15.2L2 13.4L4.35 11.675C4.28333 11.3917 4.22917 11.1125 4.1875 10.8375C4.14583 10.5625 4.125 10.2833 4.125 10C4.125 9.71667 4.14583 9.4375 4.1875 9.1625C4.22917 8.8875 4.28333 8.60833 4.35 8.325L2 6.6L3 4.8L5.65 5.95C6.03333 5.53333 6.47083 5.18333 6.9625 4.9C7.45417 4.61667 7.98333 4.41667 8.55 4.3L8.9 1.5H11.1L11.45 4.3C12.0333 4.38333 12.5667 4.57083 13.05 4.8625C13.5333 5.15417 13.9667 5.51667 14.35 5.95L17 4.8L18 6.6L15.65 8.325C15.7333 8.60833 15.7917 8.8875 15.825 9.1625C15.8583 9.4375 15.875 9.71667 15.875 10C15.875 10.2833 15.8542 10.5625 15.8125 10.8375C15.7708 11.1125 15.7167 11.3917 15.65 11.675L18 13.4L17 15.2L14.35 14.05C13.95 14.45 13.5042 14.7917 13.0125 15.075C12.5208 15.3583 12 15.5667 11.45 15.7L11.1 18.5Z" fill="white"/></svg>
               </TabButton>

				</div>

				{activeTab === ProfileTabs.information &&
               <InformationTab
                  allXp={allXp}
                  games={games}
                  items={items}
                  comments={comments}
                  me={true}
               />
            }

            {activeTab === ProfileTabs.statistics &&
               <StatisticsTab
                  commonStatistics={commonStatistics}
                  gamesStatistics={gamesStatistics}
               />
            }

            {activeTab === ProfileTabs.settings && <SettingsTab />}

			</div>
		</>
	)
}

export { ProfilePage }