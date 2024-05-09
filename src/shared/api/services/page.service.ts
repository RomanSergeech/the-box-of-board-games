import axios from "axios"

type TGameData = {
   gameId: string,
   gameName: string,
}

type TMainPageData = {
   games: TGameData[]
}


const $api = axios.create({
	withCredentials: true,
	baseURL: import.meta.env.VITE_MAIN_SERVICE_URL
})

class PageService {

	async getMainPageData() {
		return $api.get<TMainPageData>('/main-page-data')
	}

}

export default new PageService()