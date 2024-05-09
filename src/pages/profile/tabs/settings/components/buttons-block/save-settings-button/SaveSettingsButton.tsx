import { Button, Loader } from "@/shared/UI"
import { showAlert } from "@/shared/lib/utils"
import { useUserStore } from "@/shared/store/user"


export const SaveSettingsButton = () => {

   let settingsLoading = useUserStore(state => state.settingsLoading)
   const settings = useUserStore(state => JSON.stringify(state.profile_settings))
   const prevSettings = useUserStore(state => state.prevSettings)

   const saveSettingsHandler = () => {
      useUserStore.getState().saveSettings()
         .catch(() => {
            showAlert({
               text: ['Произошла непредвиденная ошибка'],
               textBtn: 'Закрыть'
            }, 4000)
         })
   }

   return (<>
      {settingsLoading && <Button borderColor="main" ><Loader fontSize={16} /></Button>}

      {!settingsLoading &&
         (prevSettings === settings
            ?
               <Button borderColor="main" disabled >
                  Сохранить настройки
               </Button>
            :
               <Button borderColor="main" onClick={saveSettingsHandler} >
                  Сохранить настройки
               </Button>
         )
      }
   </>)
}