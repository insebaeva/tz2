import {HeroFilterFormEnum} from "../enums/hero-filter-form.enum";

/**
 * Интерфейс фильтров
 *
 * @param {number} MIN_LEVEL - минимальный уровень
 * @param {number} MAX_LEVEL - максимальный уровень
 * @param {string} NAME - имя
 * @param {number[]} CAPABILITY_IDS - идентификаторы способностей
 * @param {boolean} IS_SORT_BY_LEVEL - сортировка по уровню
 */
export interface HeroFilterForm {
  [HeroFilterFormEnum.MIN_LEVEL]: number;
  [HeroFilterFormEnum.MAX_LEVEL]: number;
  [HeroFilterFormEnum.NAME]: string;
  [HeroFilterFormEnum.CAPABILITY_IDS]: number[];
  [HeroFilterFormEnum.IS_SORT_BY_LEVEL]: boolean;
}
