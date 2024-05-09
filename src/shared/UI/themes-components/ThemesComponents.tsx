import { arrayFromTo, classNames } from "@/shared/lib/utils"
import { useUserStore } from "@/shared/store/user"

interface ThemesProps {
   c: CSSModuleClasses
}
const ThemesComponents = ({ c }: ThemesProps) => {

   const profileTheme = useUserStore(state => state.profileTheme)

   return (
      <>
          {profileTheme === 'squares' &&
            <span className={c.theme_bg} >
               <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
            </span>
         }

         {profileTheme === 'vertical_lines' && 
            <>
               {arrayFromTo(1, 9).map(num => (
                  <div key={num} className={classNames(c.light, c[`x${num}`])}></div>
               ))}
            </>
         }

         {profileTheme === 'snowflakes' && 
            <>
               {arrayFromTo(1, 10).map(num => (
                  <div key={num} className={c.snowflake}>❅</div>
               ))}
            </>
         }

         {profileTheme === 'car' && 
            <div className={c.car_bg} ></div>
         }

         {profileTheme === 'virus' && 
            <div className={classNames(c.plane, c.main)}>
               {arrayFromTo(1, 6).map(num => (
                  <div key={num} className={c.circle}></div>
               ))}
            </div>
         }
      </>
   )
}

export { ThemesComponents }