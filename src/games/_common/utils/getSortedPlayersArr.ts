
export const getSortedPlayersArr = <P>( players: Record<string, P>, openIdStore: string, sequenceTurns: string[] ): P[] => {

   const playersArr = sequenceTurns.reduce<P[]>((acc, openId) => {
      const player = players[openId]
      
      if ( !player || openId === openIdStore ) {
         return acc
      }

      acc.push(player)

      return acc
   }, [])

   const currentPlayer = players[openIdStore]

   if ( !currentPlayer ) return Object.values(players)

   playersArr.unshift(currentPlayer)

   return playersArr
}
