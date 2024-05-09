import { useState } from "react"
import { Button, Tooltip } from "@/shared/UI"
import { roomSocket } from "@/shared/api/socket"
import { useRoomPageStore } from "@/shared/store/room-page"
import { useWindowWidth } from "@/shared/lib/hooks"

import { LabyrinthWithBearColors, MonopolyColors } from "@/pages/room/games-components"

import { useShopStore } from "@/shared/store/shop"
import { useUserStore } from "@/shared/store/user"
import { TRoomUser } from "@/shared/types/main-service/roomNsp.types"


interface PlayerTooltipProps {
   isHost: boolean
   itIsMe: boolean
   user: TRoomUser
   openedTooltip: boolean
   playerItemRef: React.RefObject<HTMLDivElement>
   setOpenedTooltip: React.Dispatch<React.SetStateAction<boolean>>
}
const PlayerTooltip = ({ isHost, itIsMe, user, openedTooltip, playerItemRef, setOpenedTooltip }: PlayerTooltipProps) => {

   const openIdStore = useUserStore.getState().open_id
   const choosedGameId = useRoomPageStore(state => state.choosedGame)
   const iAmReady = useRoomPageStore(state => state.readyPlayers[openIdStore])

   const [confirmNewHost, setConfirmNewHost] = useState(false)
   const [confirmKick, setConfirmKick] = useState(false)

   const allGames = useShopStore.getState().allGames

   const windowWidth = useWindowWidth()

   const closeTooltipHandler = () => {
      setOpenedTooltip(false)
      setConfirmKick(false)
      setConfirmNewHost(false)
   }

   if ( itIsMe && !choosedGameId ) return <></>

   if ( itIsMe && iAmReady ) return <></>

   return (
      <Tooltip
         orientation={windowWidth < 769 ? '_top' : '_right'}
         opened={openedTooltip}
         triggerRef={playerItemRef}
         onClose={closeTooltipHandler}
      >
         {itIsMe && choosedGameId === allGames?.monopoly.gameId &&
            <MonopolyColors openId={user.openId} />
         }
         {itIsMe && choosedGameId === allGames?.['labyrinth-with-bear'].gameId &&
            <LabyrinthWithBearColors openId={user.openId} />
         }

         {isHost && !itIsMe &&
            <MakeNewHostButton
               confirm={confirmNewHost}
               setConfirm={setConfirmNewHost}
               openId={user.openId}
            />
         }
         {isHost && !itIsMe &&
            <KickPlayerButton
               confirm={confirmKick}
               setConfirm={setConfirmKick}
               openId={user.openId}
            />
         }
      </Tooltip>
   )
}

interface MakeNewHostButtonProps {
   openId: string
   confirm: boolean
   setConfirm: React.Dispatch<React.SetStateAction<boolean>>
}
const MakeNewHostButton = ({ openId, confirm, setConfirm }: MakeNewHostButtonProps) => {

   const makeNewHost = () => {
      roomSocket.emit('makeUserANewHost', openId)
      setConfirm(false)
   }

   return (
      <Button
         borderColor="main"
         onClick={() => (confirm ? makeNewHost() : setConfirm(true))}
      >
         {confirm ? 'Подтвердить' : 'Сделать хостом'}
      </Button>
   )
}

interface KickPlayerButtonProps {
   openId: string
   confirm: boolean
   setConfirm: React.Dispatch<React.SetStateAction<boolean>>
}
const KickPlayerButton = ({ openId, confirm, setConfirm }: KickPlayerButtonProps) => {

   const kickHandler = () => {
      roomSocket.emit('kickPlayer', openId)
      setConfirm(false)
   }

   return (
      <Button
         borderColor="red_light"
         onClick={() => (confirm ? kickHandler() : setConfirm(true))}
      >
         {confirm ? 'Подтвердить' : 'Выгнать'}
      </Button>
   )
}


export { PlayerTooltip }