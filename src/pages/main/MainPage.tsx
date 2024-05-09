import { useRef, useState } from 'react'
import { useShopStore } from '@/shared/store/shop'
import { GetUrl, arrayFromTo, classNames, getRandomNum } from '@/shared/lib/utils'
import { Button, Img } from '@/shared/UI'
import { useHeaderStore } from '@/shared/store/header'
import { usePageCounter } from '@/shared/lib/hooks/yandex-metrika'

import c from './mainPage.module.scss'


const MainPage = () => {

   usePageCounter()

   const allGames = useShopStore(state => state.allGames)

   const activateLoginTab = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
      useHeaderStore.getState().activateLoginTab()
   }

	return (
		<main className={c.main} >

         <div className={c.top} >
            <h1 className='page_title' >Настольные игры онлайн</h1>
         </div>

         <div className={classNames(c.page_body, 'page_body')} >

            <div className={classNames('block', c.hello_1)} >

               <div className={c.card_border} >
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
               </div>

               <h2 className='block_title' >Добро пожаловать</h2>
               <p>
                  Здесь вы найдете настольные игры,<br/>
                  которые помогут вам скоротать время или помогут весело его провести
               </p>
               <p>
                  Мы перерабатываем правила и добавляем новые возможности,<br/>
                  чтобы привнести в игру больше пространства для хитрости и фантазии
               </p>
               <p>
                  Сайт будет постоянно дорабатываться и пополняться новым контентом.<br/>
                  И вы можете нам в этом помочь
               </p>
            </div>

            <div className={c.hello_2} >

               <Card className={c.first_card} text='|' />

               <Card className={c.second_card} text='||' />
               
               <Card className={c.third_card} text='|||' />
            
            </div>

            <div className={classNames('block', c.hello_3)} >
               <p className={c.highlight} >Создай профиль в один клик</p>
               <p>И получай удовольствие от игры с друзьями и не только</p>
               <Button
                  borderColor='main'
                  onClick={activateLoginTab}
               >
                  Начать играть
               </Button>
            </div>

            <div className={classNames('block', c.games)} >
               <h2 className='block_title' >Игры на данный момент</h2>

               <div className={c.tic_tac_toe_wrapper} >

                  <TicTacToe />

                  <div className={c.games_wrapper} >
                     {Object.values(allGames || {})?.map(game => (
                        <div key={game.gameId} className={c.game} >
                           <Img src={GetUrl.games(game.gameId, 'webp')} width='80px' height='80px' />
                           <p>{game.gameName}</p>
                           {game.cost === null && <span>( в разработке )</span>}
                        </div>
                     ))}
                  </div>

               </div>

               <p>Да не густо, но это только начало</p>
               <p>Описание игр можно посмотреть на странице магазина</p>

            </div>

            <div className={classNames('block', c.manual)} >
               <h2 className='block_title' >Краткий экскурс</h2>
               <p><span className={c.tab_name} >Домик</span> - домашняя страница, на ней можно найти открытые лобби для игры со случайными игроками</p>
               <p>
                  <span className={c.tab_name} >Задания</span> - страница с ежедневными заданиями за которые можно получать награды.
                  <br/><span className={c.indent} >Ежедневно вы будете получать по одному заданию для каждой игры.</span>
                  <br/><span className={c.indent} >За игры, которые есть в вашем профиле вы получите дополнительную награду в виде внутренней валюты</span>
               </p>
               <p><span className={c.tab_name} >Главная</span> - это главная страница</p>
               <p><span className={c.tab_name} >Ваш аватар</span> - вкладка со ссылкой на профиль и выходом</p>
               <p><span className={c.tab_name} >События</span> - страница с новостями и обновлениями</p>
               <p>
                  <span className={c.tab_name} >Магазин</span> - страница, где можно:
                  <br/><span className={c.indent} >- повысить уровень профиля, чтобы получить новые возможности;</span>
                  <br/><span className={c.indent} >- купить игры;</span>
                  <br/><span className={c.indent} >- купить различные предметы, чтобы скрасить игровой процесс;</span>
               </p>
               <p><span className={c.tab_name} >Уведомления</span> - вкладка, где появляются уведомления для вас</p>
               <p><span className={c.tab_name} >Страница жалоб и предложений</span> - можно сообщить о найденной ошибке или предложить свою идею</p>
            </div>

			</div>

		</main>
	)
}


const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const huPlayer = 'x';
const aiPlayer = 'o';

type TCurrentBoard = (number|typeof huPlayer|typeof aiPlayer)[]

type TPlayer = typeof huPlayer|typeof aiPlayer

const TicTacToe = () => {

   const [gameStatus, setGameStatus] = useState<{ winner?: TPlayer, drow?: true } | null>(null)
   const [gameScores, setGameScores] = useState<{ user: number, compucter: number, draw: number, time: number, bestTime: number }>((() => {
      const save = JSON.parse(localStorage.getItem('game_scores') || '{}')
      return save?.user !== undefined
         ? save
         : { user: 0, compucter: 0, draw: 0, time: 0, bestTime: 10_000 }
   })())

   const origBoard = useRef<TCurrentBoard>(arrayFromTo(0, 8))
   const winLineRef = useRef<HTMLHRElement>(null)
   const timesRef = useRef({
      prev: 0,
      save: [] as number[]
   })

   const filed_0 = useRef<HTMLSpanElement>(null)
   const filed_1 = useRef<HTMLSpanElement>(null)
   const filed_2 = useRef<HTMLSpanElement>(null)
   const filed_3 = useRef<HTMLSpanElement>(null)
   const filed_4 = useRef<HTMLSpanElement>(null)
   const filed_5 = useRef<HTMLSpanElement>(null)
   const filed_6 = useRef<HTMLSpanElement>(null)
   const filed_7 = useRef<HTMLSpanElement>(null)
   const filed_8 = useRef<HTMLSpanElement>(null)

   const fields = [filed_0, filed_1, filed_2, filed_3, filed_4, filed_5, filed_6, filed_7, filed_8]

   const clickField = ( fieldId: number ) => {
      const availableFields = emptyFields()

      if ( availableFields.length === 9 ) {
         timesRef.current.prev = Math.round(performance.now())
      }
      else {
         const time = Math.round(performance.now())
         timesRef.current.save.push(time - timesRef.current.prev)
         timesRef.current.prev = time
      }

      if (typeof origBoard.current[fieldId] == 'number') {

         const { win, draw } = turn(fieldId, huPlayer)

         if ( !win && !draw ) {
            turn(bestSpot(), aiPlayer)
         }
      }

   }

   const turn = ( fieldId: number, player: TPlayer ) => {

      origBoard.current[fieldId] = player

      const field = fields[fieldId]?.current

      if ( field ) field.dataset.elem = player

      const gameWon = checkWin(origBoard.current, player)

      const draw = checkDraw()

      if (gameWon) gameOver(gameWon)

      if (draw) gameOver()

      return { win: !!gameWon, draw }
   }

   const bestSpot = (): number => {
      const random = getRandomNum(0, 100)
      if ( random >= 95 ) {
         const availableFields = emptyFields()
         return availableFields[getRandomNum(0, availableFields.length-1)]!
      }
      return minimax(origBoard.current, aiPlayer).index || 0
   }

   const checkWin = ( board: TCurrentBoard, player: TPlayer ) => {

      const plays = board.reduce<TCurrentBoard>((acc, el, i) =>
         (el === player) ? acc.concat(i) : acc, [])

      let gameWon = null;

      for (let [index, combo] of winCombos.entries()) {

         if ( combo.every(elem => plays.indexOf(elem) > -1) ) {
            gameWon = { index, combo, player }
            break;
         }
      }

      return gameWon
   }

   const gameOver = (
         win?: {
            index: number;
            combo: number[];
            player: TPlayer;
         } | null
      ) => {

      const time = Math.round(timesRef.current.save.reduce((acc, t) => acc + t, 0) / timesRef.current.save.length)

      const times = {
         time
      } as any

      if ( win?.player && winLineRef.current ) {

         if ( win.player === 'x' ) {
            times.bestTime = time < gameScores.bestTime ? time : gameScores.bestTime

            setGameScores(prev => {
               prev.user += 1
               localStorage.setItem('game_scores', JSON.stringify({ ...prev, ...times }))
               return { ...prev, ...times }
            })
         }
         else {
            setGameScores(prev => {
               prev.compucter += 1
               localStorage.setItem('game_scores', JSON.stringify({ ...prev, ...times }))
               return { ...prev, ...times }
            })
         }

         setGameStatus({ winner: win.player })
         
         winLineRef.current.dataset.win = win.combo.join('')
         return
      }

      setGameScores(prev => {
         prev.draw += 1
         localStorage.setItem('game_scores', JSON.stringify({ ...prev, ...times }))
         return { ...prev, ...times }
      })
      setGameStatus({ drow: true })
   }

   const emptyFields = (): number[] => {
      return origBoard.current.filter(s => typeof s == 'number') as number[]
   }

   const checkDraw = () => {
      if ( emptyFields().length == 0 ) return true
      return false
   }

   type TMove = { index?: number, score: number }

   const minimax = ( newBoard: TCurrentBoard, player: TPlayer ): TMove => {

      const availableFields = emptyFields()

      if ( checkWin(newBoard, huPlayer) ) {
         return { score: -10 }
      }
      else if ( checkWin(newBoard, aiPlayer) ) {
         return { score: 10 }
      }
      else if ( availableFields.length === 0 ) {
         return { score: 0 }
      }

      const moves: TMove[] = []

      for (let i = 0; i < availableFields.length; i++) {
         
         const move = {} as TMove

         move.index = newBoard[availableFields[i] as any] as number

         newBoard[availableFields[i] as any] = player

         if (player === aiPlayer) {
            const result = minimax(newBoard, huPlayer)
            move.score = result.score
         } else {
            const result = minimax(newBoard, aiPlayer)
            move.score = result.score
         }

         newBoard[availableFields[i] as any] = move.index

         moves.push(move)
      }

      let bestMove: number

      if( player === aiPlayer ) {

         let bestScore = -10000

         for(var i = 0; i < moves.length; i++) {
            if ( moves[i]!.score > bestScore ) {
               bestScore = moves[i]!.score
               bestMove = i
            }
         }
      } else { 

         let bestScore = 10000

         for(var i = 0; i < moves.length; i++) {
            if (moves[i]!.score < bestScore) {
               bestScore = moves[i]!.score
               bestMove = i
            }
         }
      }

      //@ts-ignore
      return moves[bestMove]!
   }

   const restart = () => {
      origBoard.current = arrayFromTo(0, 8)
      fields.forEach(ref => {
         const el = ref.current
         if (el) delete ref.current.dataset.elem
      })
      const winLine = winLineRef.current
      if (winLine) delete winLine.dataset.win
      if ( timesRef.current ) {
         timesRef.current.prev = 0
         timesRef.current.save = []
      }
      setGameStatus(null)
   }

   return (
      <div
         className={classNames(c.tic_tac_toe, gameStatus ? c._restart : '')}
         onClick={gameStatus ? restart : ()=>{}}
      >
         <hr/> <hr/> <hr/> <hr/> <hr ref={winLineRef} />

         {arrayFromTo(0, 8).map(id => (
            <span
               ref={fields[id]}
               key={id}
               onClick={() => clickField(id)}
            ></span>
         ))}

         <div className={c.scores} >
            <p>
               <svg width="151" height="297" viewBox="0 0 151 297" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M150.221 177.605L141.977 119.908C138.645 98.015 119.1 80.205 98.4079 80.205H95.5579C108.897 73.006 117.988 58.866 117.988 42.633C117.987 19.125 98.9269 0 75.4999 0C52.0729 0 33.0129 19.125 33.0129 42.632C33.0129 58.865 42.1039 73.005 55.4429 80.204H52.5949C31.9019 80.204 12.3559 98.015 9.00988 119.995L0.779877 177.604C0.237877 181.399 1.99288 185.156 5.25288 187.174L27.1269 200.726L37.8419 275.84C39.4239 287.71 49.5529 296.999 60.9269 296.999H90.0739C101.448 296.999 111.577 287.711 113.161 275.842L123.873 200.726L145.749 187.174C149.008 185.156 150.763 181.399 150.221 177.605ZM75.4999 19.305C88.2829 19.305 98.6819 29.77 98.6819 42.632C98.6819 55.496 88.2839 65.961 75.4999 65.961C62.7169 65.961 52.3179 55.496 52.3179 42.632C52.3179 29.77 62.7169 19.305 75.4999 19.305ZM109.87 186.69C107.438 188.195 105.801 190.702 105.397 193.533L94.0409 273.166C94.0359 273.203 94.0309 273.24 94.0249 273.277C93.6899 275.84 91.4319 277.695 90.0729 277.695H60.9259C59.5679 277.695 57.3099 275.84 56.9749 273.277C56.9689 273.24 56.9639 273.203 56.9589 273.166L45.6009 193.533C45.1979 190.702 43.5599 188.195 41.1279 186.69L20.7819 174.086L28.1069 122.812C30.0299 110.18 41.2439 99.508 52.5939 99.508H98.4059C109.756 99.508 120.969 110.18 122.878 122.724L130.217 174.086L109.87 186.69Z" fill="#EAEAEA"/></svg>
               {gameScores.user}
            </p>
            <p>
               <svg width="288" height="288" viewBox="0 0 288 288" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M144 81H18C8.073 81 0 89.073 0 99V189C0 198.927 8.073 207 18 207H54V225H45C40.023 225 36 229.032 36 234C36 238.968 40.023 243 45 243H117C121.977 243 126 238.968 126 234C126 229.032 121.977 225 117 225H108V207H144C153.927 207 162 198.927 162 189V99C162 89.073 153.927 81 144 81ZM90 225H72V207H90V225ZM18 189V99H144L144.009 189H18Z" fill="#EAEAEA"/><path d="M279 45H189C184.023 45 180 49.032 180 54V234C180 238.968 184.023 243 189 243H279C283.977 243 288 238.968 288 234V54C288 49.032 283.977 45 279 45ZM270 225H198V63H270V225Z" fill="#EAEAEA"/><path d="M234 180C224.055 180 216 188.055 216 198C216 207.945 224.055 216 234 216C243.945 216 252 207.945 252 198C252 188.055 243.945 180 234 180ZM234 207C229.041 207 225 202.959 225 198C225 193.041 229.041 189 234 189C238.959 189 243 193.041 243 198C243 202.959 238.959 207 234 207Z" fill="#EAEAEA"/><path d="M207 90H261C263.484 90 265.5 87.984 265.5 85.5C265.5 83.016 263.484 81 261 81H207C204.516 81 202.5 83.016 202.5 85.5C202.5 87.984 204.516 90 207 90Z" fill="#EAEAEA"/><path d="M207 117H261C263.484 117 265.5 114.984 265.5 112.5C265.5 110.016 263.484 108 261 108H207C204.516 108 202.5 110.016 202.5 112.5C202.5 114.984 204.516 117 207 117Z" fill="#EAEAEA"/><path d="M207 144H261C263.484 144 265.5 141.984 265.5 139.5C265.5 137.016 263.484 135 261 135H207C204.516 135 202.5 137.016 202.5 139.5C202.5 141.984 204.516 144 207 144Z" fill="#EAEAEA"/><path d="M130.5 108H31.5C29.016 108 27 110.016 27 112.5V175.5C27 177.984 29.016 180 31.5 180H130.5C132.984 180 135 177.984 135 175.5V112.5C135 110.016 132.984 108 130.5 108ZM126 171H36V117H126V171Z" fill="#EAEAEA"/></svg>
               {gameScores.compucter}
            </p>
            <p>
               <svg width="265" height="265" viewBox="0 0 265 265" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_2061_2536)"><path d="M259.081 76.652L205.269 22.84C201.862 19.433 197.333 17.557 192.515 17.557C187.697 17.557 183.168 19.433 179.762 22.84L167.116 35.485C165.17 37.431 163.783 39.72 162.913 42.155L103.745 31.562C103.741 31.561 103.736 31.561 103.732 31.56C77.128 26.279 51.153 43.575 45.788 70.182L43.059 83.719C40.045 98.668 49.756 113.281 64.705 116.295C79.655 119.307 94.268 109.598 97.282 94.649L98.95 86.371L125.483 88.691L194.773 157.981L207.331 170.539C209.874 173.082 209.873 177.22 207.331 179.763C204.789 182.305 200.651 182.306 198.108 179.763L164.469 146.124C162.126 143.781 158.326 143.781 155.984 146.124C153.641 148.467 153.641 152.266 155.984 154.609L189.623 188.248C190.855 189.48 191.533 191.118 191.533 192.86C191.533 194.602 190.855 196.239 189.623 197.471C187.079 200.014 182.942 200.013 180.4 197.471L146.761 163.832C144.418 161.489 140.618 161.489 138.276 163.832C135.933 166.175 135.933 169.974 138.276 172.317L171.915 205.956C174.458 208.498 174.458 212.636 171.915 215.179C170.683 216.411 169.045 217.089 167.304 217.089C165.562 217.089 163.924 216.411 162.692 215.179L129.053 181.54C126.71 179.197 122.91 179.197 120.568 181.54C118.225 183.883 118.225 187.682 120.568 190.025L154.207 223.664C156.75 226.207 156.749 230.345 154.207 232.888C151.665 235.43 147.527 235.431 144.984 232.888L25.961 113.867L10.243 98.149C7.89998 95.806 4.09998 95.806 1.75798 98.149C-0.585018 100.492 -0.585018 104.291 1.75798 106.634L17.476 122.352L34.581 139.457L25.152 148.886C22.065 151.973 20.364 156.078 20.364 160.445C20.364 164.812 22.064 168.917 25.152 172.004L28.229 175.081C30.928 177.78 34.405 179.418 38.154 179.788C38.524 183.537 40.162 187.014 42.861 189.712L45.938 192.79C48.709 195.561 52.236 197.124 55.861 197.485C56.228 201.238 57.868 204.72 60.57 207.421L63.647 210.498C66.346 213.197 69.823 214.835 73.572 215.205C73.942 218.954 75.58 222.431 78.279 225.13L81.356 228.207C84.543 231.394 88.729 232.987 92.915 232.987C97.101 232.987 101.287 231.394 104.474 228.207L113.903 218.778L136.498 241.373C139.997 244.872 144.648 246.798 149.595 246.798C154.542 246.798 159.194 244.871 162.692 241.373C166.006 238.059 167.888 233.706 168.079 229.052C172.734 228.861 177.086 226.979 180.401 223.665C183.817 220.249 185.596 215.82 185.781 211.336C190.264 211.151 194.694 209.372 198.109 205.957C201.525 202.541 203.304 198.112 203.489 193.628C207.973 193.443 212.403 191.664 215.818 188.248C223.04 181.026 223.04 169.276 215.818 162.054L207.503 153.739L237.926 123.316L259.082 102.16C266.113 95.127 266.113 83.684 259.081 76.652ZM33.637 163.518C31.942 161.823 31.942 159.066 33.637 157.371L42.479 148.529L51.703 157.753L42.861 166.595C41.167 168.29 38.408 168.289 36.714 166.595L33.637 163.518ZM51.346 181.227C49.651 179.532 49.651 176.775 51.346 175.081L60.188 166.239L69.412 175.463L60.571 184.305C58.876 185.999 56.117 186 54.424 184.305L51.346 181.227ZM69.054 198.936C68.233 198.115 67.781 197.023 67.781 195.863C67.781 194.703 68.233 193.611 69.054 192.79L77.896 183.948L87.119 193.171L78.277 202.013C76.583 203.707 73.825 203.707 72.131 202.013L69.054 198.936ZM95.987 219.722C94.293 221.417 91.534 221.416 89.84 219.722L86.763 216.645C85.068 214.95 85.068 212.193 86.763 210.498L95.605 201.656L104.829 210.88L95.987 219.722ZM199.016 145.253L132.424 78.661C131.426 77.663 130.11 77.049 128.704 76.927L94.651 73.95C94.474 73.934 94.298 73.927 94.124 73.927C91.295 73.927 88.816 75.922 88.247 78.742L85.518 92.279C83.812 100.741 75.544 106.237 67.076 104.532C62.977 103.706 59.444 101.332 57.13 97.849C54.816 94.366 53.996 90.19 54.823 86.09L57.552 72.554C61.618 52.385 81.326 39.279 101.503 43.35C101.545 43.358 101.588 43.367 101.631 43.374L159.937 53.813L167.116 60.992L225.197 119.073L199.016 145.253ZM250.595 93.674L233.681 110.588L175.6 52.507C174.46 51.367 173.832 49.851 173.832 48.238C173.832 46.625 174.46 45.11 175.6 43.969L188.246 31.323C189.386 30.183 190.902 29.555 192.514 29.555C194.126 29.555 195.642 30.183 196.783 31.323L250.595 85.135C251.735 86.275 252.363 87.791 252.363 89.404C252.363 91.017 251.735 92.534 250.595 93.674Z" fill="#EAEAEA"/><path d="M236.071 97.787C239.385 97.787 242.071 95.1007 242.071 91.787C242.071 88.4733 239.385 85.787 236.071 85.787C232.757 85.787 230.071 88.4733 230.071 91.787C230.071 95.1007 232.757 97.787 236.071 97.787Z" fill="#EAEAEA"/></g><defs><clipPath id="clip0_2061_2536"><rect width="264.355" height="264.355" fill="white"/></clipPath></defs></svg>
               {gameScores.draw}
            </p>
            <p><span>ср. время на ход</span> {gameScores.time} мс</p>
            <p><span>лучшее победное ср. время на ход</span> {gameScores.bestTime >= 10_000 ? 0 : gameScores.bestTime} мс</p>
         </div>
      </div>
   )
}


interface CardProps {
   className: string | undefined
   text: string
}
const Card = ({ className, text }: CardProps) => {

   const longPressTimerRef = useRef<NodeJS.Timeout | null>(null)

   function inverseMousePosition( element: HTMLDivElement, event: React.MouseEvent<HTMLDivElement, MouseEvent> ) {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
    
      const res = {
        x1: -(x - rect.width / 2) / 25, // top left
        y1: -(y - rect.height / 2) / 25,
        x2: -(x - rect.width / 2) / 25, // top right
        y2: (y - rect.height / 2) / 25,
        x3: (x - rect.width / 2) / 25, // bottom left
        y3: -(y - rect.height / 2) / 25,
        x4: (x - rect.width / 2) / 25, // bottom right
        y4: (y - rect.height / 2) / 25
      };

      return res !== undefined ? res : 0; // default to 0 if undefined
    }
   function inverseTouchPosition( element: HTMLDivElement, event: React.TouchEvent<HTMLDivElement> ) {
      const rect = element.getBoundingClientRect();
      const x = event.touches[0]!.pageX - rect.left
		const y = event.touches[0]!.pageY - rect.top
    
      const res = {
        x1: -(x - rect.width / 2) / 25, // top left
        y1: -(y - rect.height / 2) / 25,
        x2: -(x - rect.width / 2) / 25, // top right
        y2: (y - rect.height / 2) / 25,
        x3: (x - rect.width / 2) / 25, // bottom left
        y3: -(y - rect.height / 2) / 25,
        x4: (x - rect.width / 2) / 25, // bottom right
        y4: (y - rect.height / 2) / 25
      };

      return res !== undefined ? res : 0; // default to 0 if undefined
    }

   const onClick = ( e: React.MouseEvent<HTMLDivElement, MouseEvent> ) => {
      function isTouchDevice() {
         return "ontouchstart" in document.documentElement;
      }
      if ( !isTouchDevice() ) {
         e.currentTarget.classList.toggle(c['_flipped']||'');
      }
   }
   const mouseMove = ( e: React.MouseEvent<HTMLDivElement, MouseEvent> ) => {
      const card = e.currentTarget
      const tilt = inverseMousePosition(card, e);

      if ( !tilt ) return
    
      card.style.setProperty("--bg-y", ''+ tilt.x1 / 2); // tone down the movement a bit
      card.style.setProperty("--bg-x", ''+ tilt.y1 / 2); // tone down the movement a bit

      card.style.setProperty("--bg-y-flipped", ''+ tilt.x3 * -1); // tone down the movement a bi
      card.style.setProperty("--bg-x-flipped", ''+ tilt.y3 * -1); // tone down the movement a bit
   }
   const mouseOut = ( e: React.MouseEvent<HTMLDivElement, MouseEvent> ) => {
      const card = e.currentTarget
      card.style.setProperty("--bg-y", '0');
      card.style.setProperty("--bg-y-flipped", '0');
      card.style.setProperty("--bg-x", '0');
      card.style.setProperty("--bg-x-flipped", '0');
   }

   const touchStart = ( e: React.TouchEvent<HTMLDivElement> ) => {
      const card = e.currentTarget
      longPressTimerRef.current = setTimeout(() => {
         card.classList.add(c['_flipped']||'');
      }, 1000);
   }
   const touchEnd = () => {
      clearTimeout(longPressTimerRef.current!);
   }
   const touchMove = ( e: React.TouchEvent<HTMLDivElement> ) => {
      const card = e.currentTarget
      const tilt = inverseTouchPosition(card, e);

      if ( !tilt ) return
    
      card.style.setProperty("--bg-y", ''+ tilt.x1 / 2);
      card.style.setProperty("--bg-x", ''+ tilt.y1 / 2);

      card.style.setProperty("--bg-y-flipped", ''+ tilt.x3 * -1);
      card.style.setProperty("--bg-x-flipped", ''+ tilt.y3 * -1);
      clearTimeout(longPressTimerRef.current!);
      card.classList.remove(c['_flipped']||'');
      card.classList.remove(c['_active']||'');
   }

   return (
      <div
         className={classNames(c.card_container, className)}
         onClick={onClick}
         onMouseMove={mouseMove}
         onMouseOut={mouseOut}
         onTouchStart={touchStart}
         onTouchEnd={touchEnd}
         onTouchMove={touchMove}
      >
         <div className={c.front}><span>{text}</span></div>
         <div className={c.back}></div>
      </div>
   )
}


export { MainPage }