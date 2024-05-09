import { TRoomUser } from "../main-service/roomNsp.types.js"

export interface TMonopolyGameSettings {
   limitTurnDuration: boolean
   turnDuration: number
   gameMode: 'PROFIT_FROM_FIELDS' | 'REWARD_FOR_THE_CIRCLE'
   infinityOfProfit?: true
}

export interface TMonopolyGameStatistics {
   [openId: string]: {
      openId: string
      capital: number
      money: number
      amountOfMoneySpent: number
      amountOfMoneyEarned: number
      purchasedFieldsCount: number
      rewardForFieldsOfYourColor: boolean
      itemsSold: number
      successfulDeals: number
   }
}

export type TCardColor = 'green'|'yellow'|'red'|'empty'

export type TInventoryItems =	'SOCK' |
										'AIRPLANE_WING' |
										'PICTURE_MONA_LISA' |
										'PICTURE_PERSISTENCE_OF_MEMORY' |
										'PICTURE_THE_SCREAM' |
										'PICTURE_HEROES' |
										'ROLEX_DATE_JUST' |
										'ROLEX_DAY_DATE' |
										'CANNON_FROM_A_TANK' |
										'COLT_PYTHON' |
										'DESERT_EAGLE' |
										'20G_GOLD' |
										'100G_GOLD' |
										'MINE_TM62M'|
										'GIFT' |
										'EMPTY'

export type TInventoryCards =	'GET_OUT_OF_JAIL'|
										'CALL_THE_SELLER'|
										'BUY_A_BRANCH' |
										'CHEATER' |
										'NEXT_ITEM_MORE_EXPENSIVE' |
										'NEXT_TURN_BY_THE_SAME_PLAYER' |
										'SELL_YOUR_FIELD' |
										'ROLL_3_DICE' |
										'ROLL_1_DICE'

export type TPlayerOPACardEvents =	'NEXT_TURN_INVERTED' |
												'NEXT_TURN_MINUS_2' |
												'DONT_HAVE_TO_PAY' |
												'NEXT_TURN_PAY_X2' |
												'POOR_DONT_HAVE_TO_PAY' |
												'NEXT_TURN_BY_THE_SAME_PLAYER' |
												'CANT_USE_CARDS'
                                    
export type TPlayer = {
	position: string
	field: { prevField: number, currentField: number }
	money: number
	purchasedFields: number[]
	fieldsForSale: Record<number, boolean>
	inventory: {
		items: string[]
		cards: string[]
	}
	OPACardColor: TCardColor
	reputationWithDealer: number
	nextTurnEvents: { [key in TPlayerOPACardEvents]?: true }
	bankrupt?: boolean
} & TRoomUser

export interface TPlayers { [openId: string]: TPlayer }

export interface TBunkrupt {
	openId: string
	nickname: string
	color: string
	img: string
	money: number
	inventory: TPlayer['inventory']
}
export interface TBunkrupts { [openId: string]: TBunkrupt }

export interface TTurnActiveElements {
	rollTheDiceBtn?: boolean
	makeADealBtn?: boolean
	endTurnBtn?: boolean
	buyFieldBtn?: boolean
	buyBranchBtn?: boolean
	buyAnyBranchBtn?: boolean
	sellItemBtn?: boolean
	getOutOfJail?: boolean
	sellFieldsBtn?: boolean
	leaveFieldInCollateralBtn?: boolean
	confirmBankruptcyBtn?: boolean
	collectProfitBtn?: boolean

	pullTheCard?: boolean
	droppedCard?: boolean

	buyFieldModal?: boolean
	buyBranchModal?: boolean
	buyAnyBranchModal?: boolean
	makeADealModal?: boolean
	payToPlayerModal?: boolean
	sellItemModal?: boolean
	amanitaModal?: boolean
	excessRedCardModal?: boolean
	makeADealOfferModal?: boolean
	sellFieldsModal?: boolean
	leaveFieldInCollateralModal?: boolean

	boxes?: boolean
	lotteryTicket?: boolean
}

export interface TLotteryTicket {
	winningTickets: { [num: number]: number }
	choosedTickets: number[]
	winningAmount: number
}

export type TGiftPrises = '100G_GOLD' | 'ROLEX_DAY_DATE' | 'SOCK' | 'EMPTY'

export interface TSellItem {
   id: string
	name: TInventoryItems
	dealerOffer: number
	playerOffer: number
	parts: number[]
}

export type TMakeADealOffer = {
   openId: string
   money: number
	fields: number[]
	items: string[]
	cards: string[]
}
export type TMakeADealOffers = Record<string, TMakeADealOffer>

type TCurrentTurnSomeEvent =	'MOVE_FORWARD_1-4_FIELDS' |
										'MOVE_BACK_1-3_FIELDS' |
										'NEXT_ITEM_MORE_EXPENSIVE' |
										'ROLL_3_DICE' |
										'ROLL_1_DICE'

export interface TCurrentTurn {
	openId: string
	activeElements: TTurnActiveElements
	someEvents: { [key in TCurrentTurnSomeEvent | TPlayerOPACardEvents]?: true }
	boxes?: { 1: number|null, 2: number|null }
	lotteryTicket?: TLotteryTicket
	sellItemsData?: {
		currentItem: string
		items: Record<string, TSellItem>
	}
	excessRedCard?: string[]
	makeADealOffer?: {
		offerer: TMakeADealOffer
		recipient: TMakeADealOffer
	}
	successedDeal?: boolean
}

export interface TFieldForSale {
	fieldNum: number
	cost: number
}

type TOPACardSomeEvent =
   | 'CHANGE_COLOR_TO_YELLOW'
   | 'CHANGE_COLOR_TO_RED'
   | 'MOVE_FORWARD_1-4_FIELDS'
   | 'MOVE_BACK_1-3_FIELDS'
   | 'NEXT_TURN_INVERTED'
   | 'NEXT_TURN_MINUS_2'
   | 'DONT_HAVE_TO_PAY'
   | 'MOVE_TO_THE_START'
   | 'MOVE_TO_THE_SELLER'
   | 'NEXT_TURN_PAY_X2'
   | 'PLAYER_GOT_ARRESTED'
   | 'POOR_DONT_HAVE_TO_PAY'
   | 'AMANITA'
   | 'CANT_USE_CARDS'

export interface TOPACard {
	cardColor: TCardColor
	cardNum: number
	cardImg: string
	cardName?: TInventoryCards
	moneyAction?: { [openId: number]: number }
	text?: string
	money?: number|string
	boxes?: { 1: number|null, 2: number|null }
	lotteryTicket?: TLotteryTicket
	someEvent?: TOPACardSomeEvent
	moveBackData?: { openId: string, prevField: number }
	fieldUpToSale?: TFieldForSale
	jailTerm?: number

	itemName?: TInventoryItems
	loseAnItem?: TInventoryItems | ''
}

export interface TArrestedPlayers {
	[openId: string]: { jailTerm: number, color: string, startCount: boolean }
}

export interface TConnectedPlayers {
   [openId: string]: boolean
}

export interface TPlayersMoneyAction {
   [openId: string]: { value: number }[]
}
export interface TMoneyAction {
   [openId: string]: number
}

export interface TField {
	owner: string
	color: string
	branchCount: number
	profitToCollect: number
	newCost?: number
	saleCost?: number | null
	debtAmount?: number | null
}
export type TFieldsData = Record<number, TField>


export type TEndGamePlayerData = {
   nickname: string
} & TMonopolyGameStatistics[string]

export type TEndGame = {
   winner: { openId: string, nickname: string }
   players: TEndGamePlayerData[]
   bankrupts: TEndGamePlayerData[]
}

export type TMonopolyColors =
   | 'red' | 'green' | 'yellow'
   | 'orange' | 'brown' | 'blue'
   | 'violet' | 'cyan'
   | 'gray' | 'darkGray'

export type TBasicFieldsData = {
   [fieldNum: number]: Readonly<{
      color: TMonopolyColors
      cost: number
      branchCost: number
      areaName: string
      name: string
      profit: readonly [number, number, number, number]
      opaCardText: string
   }>
}


export interface TGameData {
	roomId: string
   players: TPlayers
   connectedPlayers: TConnectedPlayers
   currentTurn: TCurrentTurn
   sequenceTurns: string[]
   gameSettings: TMonopolyGameSettings
   startTime: number
   endGame: TEndGame | null
   turnTimer: NodeJS.Timeout | null
   currentTurnTimer: number
   gameTimer: NodeJS.Timeout | null
	gameRunned: boolean

   constants: {
      rewardForFieldsOfYourColor: number
      getOutOfJailCost: number
      penaltyForMissingTurn: number
      basicFieldsData: TBasicFieldsData
   }

   bankrupts: TBunkrupts
	fieldsData: TFieldsData
	arrestedPlayers: TArrestedPlayers
   statistics: Record<string, Pick<TMonopolyGameStatistics[string],
      | 'openId'
      | 'amountOfMoneyEarned'
      | 'amountOfMoneySpent'
      | 'itemsSold'
      | 'rewardForFieldsOfYourColor'
      | 'successfulDeals'
      | 'purchasedFieldsCount'
   >>
}

export type TGameDataDto = Omit<TGameData, 'gameTimer'|'gameRunned'|'turnTimer'|'statistics'|'constants'>

export interface TConnectToGameData {
   roomId: string
   openId: string
}


export interface TNewGameStateData {
	connectedPlayers?: TConnectedPlayers
	players?: TPlayers
	bankrupts?: TBunkrupts
	fieldsData?: TFieldsData
	currentTurn?: TCurrentTurn
	arrestedPlayers?: TArrestedPlayers
	startTime?: number
	endGame?: TEndGame | null
   currentTurnTimer?: number
}
