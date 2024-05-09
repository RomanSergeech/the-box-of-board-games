
import type { TGameDataDto as TLabyrinthWithBearGameDataDto } from "@/shared/types/games-service/labyrinthWithBear.types"
import type { TGameDataDto as TMonopolyGameDataDto } from "@/shared/types/games-service/monopoly.types"


export type TGamesData = TMonopolyGameDataDto | TLabyrinthWithBearGameDataDto
