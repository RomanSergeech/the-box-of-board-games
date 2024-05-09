import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { AxiosError } from 'axios'
import { useUserStore } from '@/shared/store/user'
import { useFriendsStore } from '@/shared/store/friends'
import AuthService from '@/shared/api/services/auth.service'
import { mainSocket } from '@/shared/api/socket'
import { useShopStore } from './shop'
import { showAlert } from '../lib/utils'

import type { TChangePasswordRequest, TChangePasswordResponse, TConfirmActivationCodeRequest, TConfirmActivationCodeResponse, TLoginResponse, TOAuthResponse, TRegistrationRequest, TRegistrationResponse, TSendActivationCodeRequest, TSendActivationCodeResponse, TUserDto, TVerificationRequest, TVerificationResponse, TVkOAuthData, TYandexOAuthData } from '@/shared/types/main-service/auth.types'


interface TAuthState {
   isAuth: boolean
   storeReady: boolean

   confirmEmail: string
   emailConfirmed: boolean

   oauthSended: boolean
}

interface TAuthStore extends TAuthState {
   resetData: () => void
   checkAuth: () => void
   sendActivationCode: (
      data: TSendActivationCodeRequest,
      registration: { registration: boolean },
   ) => Promise<TSendActivationCodeResponse>
   confirmActivationCode: (
      data: TConfirmActivationCodeRequest,
      registration: { registration: boolean },
   ) => Promise<TConfirmActivationCodeResponse>
   registration: (
      authData: TRegistrationRequest
   ) => Promise<TRegistrationResponse>
   login: (
      authData: { email: string, password: string },
      cb: () => void
   ) => Promise<TLoginResponse>
   logout: () => void
   verification: (
      authData: TVerificationRequest
   ) => Promise<TVerificationResponse>
   changePassword: (
      authData: TChangePasswordRequest
   ) => Promise<TChangePasswordResponse>
   oauthYandex: (
      authData: TYandexOAuthData
   ) => Promise<TOAuthResponse<boolean>>
   oauthVk: (
      authData: TVkOAuthData
   ) => Promise<TOAuthResponse<boolean>>
}

const initialState: TAuthState = {
   isAuth: false,
   storeReady: false,

   confirmEmail: '',
   emailConfirmed: false,

   oauthSended: false
}

export const useAuthStore = create(
   devtools<TAuthStore>((set) => ({
      ...initialState,

      resetData: () => set({ ...initialState }),

      checkAuth: async () => {
         try {
            const { data } = await AuthService.checkAuth()

            onAuthorized(data)

            set({
               isAuth: true,
               storeReady: true
            })
         } catch (e: any) {
            set({ storeReady: true })
            localStorage.removeItem('token')
         }
      },

      sendActivationCode: async ( data, {registration} ) => {
         try {
            const response = await AuthService.sendActivationCode(data, registration)
            return response?.data
         } catch (err) {
            const msg = err instanceof AxiosError
               ? err.response?.data.message
               : 'Что-то пошло не так, попробуйте ещё раз'

            throw new Error(msg)
         }
      },

      confirmActivationCode: async ( data, {registration} ) => {
         try {
            const response = await AuthService.confirmActivationCode(data, registration)
            return response?.data
         } catch (err) {
            const msg = err instanceof AxiosError
               ? err.response?.data.message
               : 'Что-то пошло не так, попробуйте ещё раз'

            throw new Error(msg)
         }
      },

      oauthYandex: async (authData) => {
         try {
            const response = await AuthService.oauthYandex(authData)

            const bindData = response?.data as TOAuthResponse<true>

            if ( bindData?.auth_with ) {
               useUserStore.setState({ auth_with: bindData.auth_with })
               return bindData
            }

            onAuthorized(response?.data)

            set({
               isAuth: true,
               storeReady: true
            })

            return response?.data

         } catch (err) {
            set({ storeReady: true })

            mainSocket.connect()

            const msg = err instanceof AxiosError
               ? err.response?.data.message
               : 'Что-то пошло не так, попробуйте ещё раз'

            throw new Error(msg)
         }
      },

      oauthVk: async (authData) => {
         try {
            const response = await AuthService.oauthVk(authData)

            const bindData = response?.data as TOAuthResponse<true>

            if ( bindData?.auth_with ) {
               useUserStore.setState({ auth_with: bindData.auth_with })
               return bindData
            }

            onAuthorized(response?.data)

            set({
               isAuth: true,
               storeReady: true
            })

            return response?.data

         } catch (err) {
            set({ storeReady: true })

            mainSocket.connect()

            const msg = err instanceof AxiosError
               ? err.response?.data.message
               : 'Что-то пошло не так, попробуйте ещё раз'

            throw new Error(msg)
         }
      },

      registration: async (authData) => {
         try {
            const response = await AuthService.registration(authData)

            onAuthorized(response?.data)

            set({
               isAuth: true,
               storeReady: true
            })

            return response?.data

         } catch (err) {
            set({ storeReady: true })

            mainSocket.connect()

            const msg = err instanceof AxiosError
               ? err.response?.data.message
               : 'Что-то пошло не так, попробуйте ещё раз'

            throw new Error(msg)
         }
      },

      login: async (authData, cb) => {
         try {
            const response = await AuthService.login(authData)

            onAuthorized(response?.data)

            set({
               isAuth: true,
               storeReady: true
            })

            cb()

            return response?.data
         }
         catch (err) {
            set({ storeReady: true })

            const msg = err instanceof AxiosError
               ? err.response?.data.message
               : 'Что-то пошло не так, попробуйте ещё раз'

            throw new Error(msg)
         }
      },

      logout: async () => {
         try {
            await AuthService.logout()

            localStorage.clear()
            sessionStorage.clear()

            mainSocket.disconnect()

            useUserStore.getState().resetUserData()

            set({ ...initialState })
         } catch (e: any) {
            console.error(e)
         }
      },

      verification: async ( authData ) => {
         try {
            const response = await AuthService.verification(authData)
            return response?.data
         } catch ( err ) {
            const msg = err instanceof AxiosError
               ? err.response?.data.message
               : 'Что-то пошло не так, попробуйте ещё раз'

            throw new Error(msg)
         }
      },

      changePassword: async ( authData ) => {
         try {
            const response = await AuthService.changePassword(authData)
            return response?.data
         } catch ( err ) {
            const msg = err instanceof AxiosError
               ? err.response?.data.message
               : 'Что-то пошло не так, попробуйте ещё раз'

            throw new Error(msg)
         }
      },

   }))
)

export type TAuthResponse = {
   accessToken: string,
   user_dto: TUserDto
}
export function onAuthorized({ accessToken, user_dto }: TAuthResponse) {

   const {
      friends,
      transactions_history,
      allGames,
      allItems,
      subscriptionEnded,
      ...userData
   } = user_dto

   useUserStore.getState().saveUserData(userData)

   // useNotificationsStore.setState({ notifications })

   useFriendsStore.setState({ friends })

   useShopStore.setState({ transactions_history, allGames, allItems })

   localStorage.setItem('token', accessToken)

   if ( subscriptionEnded ) {
      showAlert({
         text: ['Подписка закончилась'],
         textBtn: 'Перейти в магазин'
      }, 4000,
      () => {
         (document.querySelector('#shopLink') as HTMLLinkElement)?.click()
      })
   }

}