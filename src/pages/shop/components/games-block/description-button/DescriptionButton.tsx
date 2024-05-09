import { Button, Img, Modal } from "@/shared/UI"
import { useModal, useWindowWidth } from "@/shared/lib/hooks"
import { GetUrl, classNames } from "@/shared/lib/utils"

import type { TAllGames, TGameRules } from "@/shared/types/main-service/mainNsp.types"

import c from './descriptionButton.module.scss'


interface DescriptionButtonProps {
   game: TAllGames[keyof TAllGames]
}
const DescriptionButton = ({ game }: DescriptionButtonProps) => {

   const { activeModal, openModal, triggerRef, modalBodyRef, modalRef } = useModal()

   const page_1_FrontHandler = () => {
      const book = modalBodyRef.current
      if ( !book ) return
      book.style.setProperty('--rotate-1', '-180deg')
      book.style.setProperty('--translate', '50%')
   }
   const page_1_BackHandler = () => {
      const book = modalBodyRef.current
      if ( !book ) return
      book.style.removeProperty('--rotate-1')
      book.style.removeProperty('--z-index-1')
      book.style.removeProperty('--z-index-2')
      book.style.removeProperty('--translate')
   }

   const pageFrontHandler = ( id: number, last?: true ) => {
      const book = modalBodyRef.current
      if ( !book ) return
      book.style.setProperty(`--rotate-${id}`, '-180deg')
      book.style.setProperty(`--z-index-${id}`, '10')
      if ( last ) {
         book.style.setProperty('--translate', '100%')
      }
   }
   const pageBackHandler = ( id: number, last?: true ) => {
      const book = modalBodyRef.current
      if ( !book ) return
      book.style.removeProperty(`--rotate-${id}`)
      book.style.removeProperty(`--z-index-${id+1}`)
      if ( last ) {
         book.style.setProperty('--translate', '50%')
      }
   }

   const windowWidth = useWindowWidth()

   return (
      <>
         <Button
            id={'gameDescriptionButton_'+game.gameId}
            onClick={openModal}
            ref={triggerRef}
         >
            Описание
         </Button>

         <Modal active={activeModal} ref={modalRef} wrapperClassName={c.modal_body_wrapper} >
            <div className={c.book_container} ref={modalBodyRef} >
               <div className={windowWidth > 1000 ? c.book : c.list}>

                  <div className ={classNames(c.page_container, c.page_1)} >
                     <div
                        className={classNames(c.page, c.front, c.page_1_front)}
                        onClick={page_1_FrontHandler}
                     >
                        <h1>{game.gameName}</h1>
                        <h3>Описание и правила</h3>
                        <h2><span>The Box Of</span> <span>Board Games</span></h2>
                     </div>
                     <div
                        className={classNames(c.page, c.back, c.page_1_back)}
                        onClick={page_1_BackHandler}
                     >  
                        <div className={c.img_wrapper} >
                           <Img src={GetUrl.games(game.gameId, 'webp')} width='50%' height='auto' />
                        </div>
                        <p className={c.rules_text} >Количество игроков: <span>{game.countUsersInGame.min} - {game.countUsersInGame.max}</span></p>
                        <p className={c.rules_text} >Рекомендуемое количество игроков: <span>{game.description.comfortableCountPlayers}</span></p>
                        <p className={c.rules_text} >Средняя продолжительность игры: <span>{game.description.averageGameDuration}</span></p>
                     </div>
                  </div>

                  {game.description.rules.map(page => (
                     <div key={page.id} className ={classNames(c.page_container, c[`page_${page.id}`])} >
                        <div
                           className={classNames(c.page, c.front, c[`page_${page.id}_front`])}
                           onClick={() => pageFrontHandler(page.id, page?.last)}
                        >
                           <PageList pageList={page.lists[0]} />
                        </div>
                        <div
                           className={classNames(c.page, c.back, c[`page_${page.id}_back`], page?.last ? c.last : '')}
                           onClick={() => pageBackHandler(page.id, page?.last)}
                        >
                           <PageList pageList={page.lists?.[1]} />
                        </div>
                     </div>
                  ))}

               </div>

            </div>
         </Modal>
      </>
   )
}

interface PageListProps {
   pageList: TGameRules[number]['lists'][number] | undefined
}
const PageList = ({ pageList }: PageListProps) => {
   return (
      <>
         {pageList?.map((list, index) => {
            if ( list?.title ) {
               return <span key={index} className={c.title} >{list.title}</span>
            }
            else if ( list?.subTitle ) {
               return <span key={index} className={c.sub_title} >{list.subTitle}</span>
            }
            else if ( list?.text ) {
               return <span key={index} className={c.rules_text} >{list.text}</span>
            }
            else if ( list?.score ) {
               const lineArr = list.score.split('|')
               return (
                  <span key={index} className={c.scores} >
                     <span>{lineArr[0]}</span>
                     <span>|</span>
                     <span>{lineArr[1]}</span>
                  </span>
               )
            }
            else if ( list?.controls ) {
               return (
                  <div key={index} className={c.controls} >
                     <img src={GetUrl.games().rules(list.controls.img)} className={c.controls_svg} />
                     {list.controls.description.map((line, i) => (
                        <span className={c.rules_text} key={i} >
                           <img src={GetUrl.games().rules(line.svg)} width={20} height={20} />
                           {line.text}
                        </span>
                     ))}
                  </div>
               )
            }
         })}
      </>
   )
}

export { DescriptionButton }