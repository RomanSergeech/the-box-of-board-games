import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { classNames } from '@/shared/lib/utils'
import { Loader, TabButton } from '@/shared/UI'
import { InformationTab, StatisticsTab } from './tabs'
import { useSomeUserProfileStore } from '@/shared/store/some-user'
import { useUserStore } from '@/shared/store/user'

import c from './profilePage.module.scss'

const enum ProfileTabs {
   information = 'information',
   statistics = 'statistics',
   settings = 'settings'
}

const SomeUserProfilePage = () => {

	const [activeTab, setActiveTab] = useState<`${ProfileTabs}`>(ProfileTabs.information)

   const openIdStore = useUserStore.getState().open_id
   const nicknameStore = useUserStore.getState().nickname

   const black_list = useUserStore(state => state.black_list)
   const black_mark = useUserStore(state => state.black_mark)

   const userData = useSomeUserProfileStore()

   const params = useParams()

	useEffect(() => {
		if (params.id) userData.getUserData(params.id)
	}, [params.id])

	return (
		<>
			<div className='top'>

            {userData.userNotFound && <h1 className='page_title' >Игрок не найден</h1>}

            { !userData.userNotFound &&
            (nicknameStore === userData.nickname
               ? <h1 className='page_title' >Так ваш профиль видят<br/>другие игроки</h1>
               : <h1 className='page_title' >Профиль игрока<br/> {userData.nickname}</h1>)
            }

			</div>

         {userData.loading && <Loader />}

         {!userData.loading && !userData.userNotFound &&
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

               </div>

               {activeTab === ProfileTabs.information &&
                  <InformationTab
                     allXp={userData.common_statistics.allXp}
                     games={userData.games}
                     items={userData.items}
                     comments={userData.comments}
                     me={openIdStore === userData.open_id}
                     someUserData={{
                        someUserId: userData.open_id,
                        inBlackList: black_list.includes(userData.open_id),
                        withBlackMark: black_mark.includes(userData.open_id),
                        isFriend: userData.isFriend,
                        profile_settings: userData.profile_settings
                     }}
                  />
               }

               {activeTab === ProfileTabs.statistics &&
                  <StatisticsTab
                     commonStatistics={userData.common_statistics}
                     gamesStatistics={userData.games_statistics}
                  />
               }

            </div>
         }

		</>
	)
}

export { SomeUserProfilePage }