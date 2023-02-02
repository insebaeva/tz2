import {Hero} from "../interfaces/hero.interface";
import {HeroEnum} from "../enums/hero.enum";

export abstract class AppLib {
  /**
   * Начальные данные формы героя
   */
  public static readonly defaultHero: Hero = {
    [HeroEnum.NAME]: '',
    [HeroEnum.POWER]: 1,
    [HeroEnum.CAPABILITY_IDS]: [],
    [HeroEnum.LEVEL]: 1,
    [HeroEnum.ID]: 0
  };
}
