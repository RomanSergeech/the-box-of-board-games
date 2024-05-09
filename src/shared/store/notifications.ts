import { create } from "zustand"
import { mainSocket } from "@/shared/api/socket"

import type { TNotification } from "@/shared/types/main-service/user.types"


export type TNotifications = Record<string, TNotification>

export interface TNotificationsState {
	notifications: TNotifications
	notificationsToDelete: string[]
	deleteNoticeTimer?: NodeJS.Timeout
}

interface TNotificationsStore extends TNotificationsState {
	addNotification: ( notification: TNotification ) => void
	deleteNotification: ( noticeId: string ) => void
	clearAll: () => void
}

const initialState: TNotificationsState = {
	notifications: {},
	notificationsToDelete: []
}

export const useNotificationsStore = create<TNotificationsStore>(
	(set, get) => ({
		...initialState,

		addNotification: ( notification ) => {
			const notifications = get().notifications

			notifications[notification.id] = notification

			set({ notifications })
		},

		deleteNotification: ( noticeId ) => {
			const notifications = get().notifications
			const notificationsToDelete = get().notificationsToDelete

			delete notifications[noticeId]

			notificationsToDelete.push(noticeId)

			clearTimeout(get().deleteNoticeTimer)

			const deleteNoticeTimer = setTimeout(() => {
				mainSocket.emit('api:deleteNotifications', notificationsToDelete )
				useNotificationsStore.setState({ notificationsToDelete: [] })
			}, 2000)

			set({ notifications, deleteNoticeTimer })
		},

		clearAll: () => {
			const notificationsToDelete = [] as string[]

			Object.values(get().notifications).forEach(notice => {
				notificationsToDelete.push(notice.id)
			})

			mainSocket.emit('api:deleteNotifications', notificationsToDelete )

			set({ notifications: {} })
		}

	})
)