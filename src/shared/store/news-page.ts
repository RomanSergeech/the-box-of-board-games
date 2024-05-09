import { create } from "zustand"

import type { TTheNews } from "../types/main-service/mainNsp.types"


interface TEventsState {
	news: {
      [id: string]: TTheNews
   }
}

interface TEventsStore extends TEventsState {
	addNews: ( news: TTheNews[] ) => void
	addTheNews: ( theNews: TTheNews ) => void
	deleteTheNews: ( newsId: string ) => void
}

const initialState: TEventsState = {
	news: {}
}

export const useNewsPageStore = create<TEventsStore>(
	(set, get) => ({
		...initialState,

		addNews: ( news ) => {
         set({ news: news.reduce<TEventsState['news']>((acc, theNews) => {
            acc[theNews.id] = theNews
            return acc
         }, {}) })
      },

		addTheNews: ( theNews ) => {
         const news = structuredClone(get().news)
         news[theNews.id] = theNews
         set({ news })
      },

		deleteTheNews: ( newsId ) => {
         const news = structuredClone(get().news)
         delete news[newsId]
         set({ news })
      }

	})
)
