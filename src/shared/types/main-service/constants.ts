
export const enum EAllGamesIds {
   monopoly = "monopoly",
   labyrinthWithBear = "labyrinth-with-bear",
   balabol = "balabol",
   chess = "chess",
   words = "words",
}

export const enum EAllItemsIds {
   gamepad = "gamepad",
}

export type TAllGamesIds = `${EAllGamesIds}`

export type TAllItemsIds = `${EAllItemsIds}`

export const enum EProfileLevel {
   level_1 = "level_1",
   level_2 = "level_2",
   level_3 = "level_3",
}
 
export const enum EUserRole {
   user = "User",
   moderator = "Moderator",
   administrator = "Administrator",
}
