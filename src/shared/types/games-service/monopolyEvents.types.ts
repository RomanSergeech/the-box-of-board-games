import type { TConnectToGameData, TCurrentTurn, TFieldsData, TGameData, TGameDataDto, TGiftPrises, TLotteryTicket, TMoneyAction, TNewGameStateData, TOPACard, TPlayer, TPlayerOPACardEvents, TPlayers, TSellItem, TTurnActiveElements } from "./monopoly.types.js"


export interface TGameClientToServerEvents {

   connectToGame: (
      data: TConnectToGameData,
      callback: (obj: {
         err?: 'Game Not Runned' | 'Access Denied'
         gameData?: TGameDataDto & {
            constants: TGameData['constants']
         }
      }) => void
   ) => void

	rollTheDice: (
      newFieldNum: number,
      dices: { dice_1: number, dice_2?: number, dice_3?: number },
      playerPosition: string,
      currentTurnData: { activeElements: TTurnActiveElements, jailTerm?: number },
      passedFields: number[],
      deleteEvents: TPlayerOPACardEvents[]
   ) => void

	getOutOfJail: (
      jailTerm: number
   ) => void

	makeADealOffer: (
      makeADealOffer: TCurrentTurn['makeADealOffer']
   ) => void
	
	makeADealSuccess: (
      fieldsOfMyColor?: readonly number[],
      fieldsOfHisColor?: readonly number[]
   ) => void

	makeADealCancel: () => void

	nextTurn: (
      confirmBankruptcy?: boolean
   ) => void

	endTurn: () => void

	abortTurn: () => void

	buyAField: (
      cost: number,
      profitToCollect: number,
      reward: boolean
   ) => void

	sellTheField: (
      saleCost: number,
      fieldNum: number,
      newOwnerId: string,
      prevOwnerId: string
   ) => void

	putUpFieldsForSale: (
      choosedFields:  number[],
      fieldsCosts: {[fieldNum:number]:number},
      sellAmount: number
   ) => void

	giveAwayFieldsInCollateral: (
      choosedFields: number[],
      fieldsDebtAmounts: {[fieldNum:number]:number},
      sellAmount: number
   ) => void

	payTheDebtOff: (
      fieldNum: number
   ) => void

	buyBranch: (
      fieldNum: number,
      elementName: keyof TTurnActiveElements
   ) => void

	collectProfit: (
      fieldNum: number,
      cost: number
   ) => void

	playerPays: (
      openId: string,
      owner: string,
      profit: number,
      profitForField: number
   ) => void

	pullTheCard: (
      OPACard: TOPACard
   ) => void

	chooseABox: (
      money: number | null
   ) => void

	chooseALotteryTicketNumber: (
      lotteryTicket: TLotteryTicket
   ) => void

	openTheGift: (
      prise: TGiftPrises
   ) => void

	itemDataToSell: (data: {
      itemId?: string,
      sellItemData?: TSellItem
   }) => void

	sellItem: (
      dealerOffer: number,
      itemId: string
   ) => void

	runRedCardLogic: (
      cardId: string,
      activeElements?: TTurnActiveElements,
      someData?: {[key:string]:any}
   ) => void

	chooseExcessRedCard: (
      newRedCards: TPlayer['inventory']['cards']
   ) => void

	getPlayerData: (
      openId: string,
      callback: ( playerData: TPlayer ) => void
   ) => void

	endGame: () => void

}

export interface TGameServerToClientEvents {

	newGameData: (
		newStateData?: TNewGameStateData,
		moneyAction?: { [openId: string]: number },
		changeMoneyWithUpdateStore?: false
	) => void

	newTurn: ( newStateData: TNewGameStateData ) => void

	rollTheDice: ( obj: {
		openId: string
		newFieldNum: number
		dices: { dice_1: number, dice_2?: number, dice_3?: number }
		playerPosition: string
		newStateData: TNewGameStateData
		// rewardForTheCircle?: number
	} ) => void

	makeADealSuccess: (
		recipientNickname: string,
		moneyAction: TMoneyAction,
		players: TPlayers,
		currentTurn: TCurrentTurn,
		fieldsData: TFieldsData,
		rewardsForAllFieldsOfPlayersColor: {[openId: string]: number}
	) => void

	makeADealCancel: (
		currentTurn: TCurrentTurn
	) => void

	buyAField: ( obj: {
		openId: string,
		cost: number,
		players: TPlayers,
		fieldsData: TFieldsData,
		currentTurn: TCurrentTurn,
		reward: boolean,
		// alert: boolean
	} ) => void

	pullTheCard: (
      OPACard: TOPACard,
      openId: string,
      player: TPlayer
   ) => void

	chooseALotteryTicketNumber: (
      currentTurn: TCurrentTurn,
      isLast: boolean,
      moneyAction: { [openId: string]: number }
   ) => void

	runRedCardLogic: (
      openId: string,
      cardId: string
   ) => void

}
