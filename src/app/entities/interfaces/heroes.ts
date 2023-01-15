import {HeroEnum} from "../enums/hero.enum";

export interface Hero {
  [HeroEnum.NAME]: string;
  [HeroEnum.POWER]: number;
  [HeroEnum.CAPABILITY_IDS]: string[];
  [HeroEnum.LEVEL]: number;
  [HeroEnum.ID]: number;
}

