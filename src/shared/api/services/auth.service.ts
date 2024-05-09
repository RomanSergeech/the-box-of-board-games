import axios from "axios"

import type { TAuthResponse } from "@/shared/store/auth"
import { TChangePasswordRequest, TChangePasswordResponse, TConfirmActivationCodeRequest, TConfirmActivationCodeResponse, TLoginRequest, TLoginResponse, TRegistrationRequest, TRegistrationResponse, TSendActivationCodeRequest, TSendActivationCodeResponse, TVerificationRequest, TVerificationResponse, TVkOAuthData, TYandexOAuthData } from "@/shared/types/main-service/auth.types"

const $api = axios.create({
	withCredentials: true,
	baseURL: import.meta.env.VITE_MAIN_SERVICE_URL
})

$api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token') || ''}`
	return config
})

class AuthService {

	async sendActivationCode( sendObj: TSendActivationCodeRequest, registration: boolean ) {
      if ( registration ) {
         return $api.post<TSendActivationCodeResponse>('/registration-send-activation-code', sendObj)
      }
      return $api.post<TSendActivationCodeResponse>('/send-activation-code', sendObj)
	}

	async confirmActivationCode( sendObj: TConfirmActivationCodeRequest, registration: boolean ) {
      if ( registration ) {
         return $api.post<TSendActivationCodeResponse>('/registration-confirm-activation-code', sendObj)
      }
		return $api.post<TConfirmActivationCodeResponse>('/confirm-activation-code', sendObj)
	}

	async registration( sendObj: TRegistrationRequest ) {
		return $api.post<TRegistrationResponse>('/registration', sendObj)
	}

	async oauthYandex( sendObj: TYandexOAuthData ) {
		return $api.post('/oauth-yandex', sendObj)
	}
	async oauthVk( sendObj: TVkOAuthData ) {
		return $api.post('/oauth-vk', sendObj)
	}

	async login( sendObj: TLoginRequest ) {
		return $api.post<TLoginResponse>('/login', sendObj)
	}
   
	async logout() {
      return $api.get('/logout')
	}

   async verification( sendObj: TVerificationRequest ) {
      return $api.post<TVerificationResponse>('/verification', sendObj)
   }

   async changePassword( sendObj: TChangePasswordRequest ) {
      return $api.post<TChangePasswordResponse>('/change-password', sendObj)
   }

	async checkAuth() {
		return $api.get<TAuthResponse>('/refresh')
	}

}

export default new AuthService()