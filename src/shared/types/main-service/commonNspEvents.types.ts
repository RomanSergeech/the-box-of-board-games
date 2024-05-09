

export interface TCommonNspClientToServerEvents {

   socketConnect: (
		openId: string,
		friends: string[],
		callback: ( haveOpenTab: boolean ) => void
	) => void

}

export interface TCommonNspServerToClientEvents {}