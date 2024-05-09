
type SocketCallback<Data> = ( data?: Data, err?: any | undefined ) => void

type AllKeys<T> = T extends any ? keyof T : never

type AllValues<T> = T extends any ? T[keyof T] : never
