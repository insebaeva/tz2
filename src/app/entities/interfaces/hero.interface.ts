import {HeroEnum} from "../enums/hero.enum";
import {IdName} from "./id-name.interface";

/**
 * Интерфейс героя
 *
 * @param {number} POWER - сила
 * @param {number[]} CAPABILITY_IDS - идентификаторы способностей
 * @param {number} LEVEL - начальный уровень
 */
export interface Hero extends IdName {
  [HeroEnum.POWER]: number;
  [HeroEnum.CAPABILITY_IDS]: number[];
  [HeroEnum.LEVEL]: number;
}

