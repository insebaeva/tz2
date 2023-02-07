import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AppService} from "../../../../../services/app.service";
import {Hero} from "../../interfaces/hero.interface";
import {IdName} from "../../../../../interfaces/id-name.interface";
import {HeroFilterForm} from "../../interfaces/hero-filter-form.interface";
import {HeroFilterFormEnum} from "../../enums/hero-filter-form.enum";
import {HeroEnum} from "../../enums/hero.enum";
import {AppFormBuilderService} from "../../../../../services/app-form-builder.service";
import {AppComponentClass} from "../../../../../classes/app-component.class";
import {filter} from "rxjs";

@Component({
  selector: 'hero-filter-form',
  templateUrl: './hero-filter-form.component.html',
  styleUrls: ['./hero-filter-form.component.scss']
})

export class HeroFilterFormComponent extends AppComponentClass implements OnInit {
  public filterFormGroup: FormGroup = this._appFormBuilderService.getDefaultFilterFormGroup()

  public heroes: Hero[] = [];
  public capabilities: IdName[] = [];

  public HERO_FILTER: typeof HeroFilterFormEnum = HeroFilterFormEnum;

  constructor(
    private readonly _appService: AppService,
    private readonly _appFormBuilderService: AppFormBuilderService,
  ) {
    super();
  }

  public ngOnInit(): void {
    this._getHeroes();
    this._getCapabilities();
    this._subscribeOnFormChanges();
  }

  /**
   * Получение способностей
   * @private
   */
  private _getCapabilities(): void {
    this._observeSafe(this._appService.capabilities$)
      .pipe(
        filter((capabilities: IdName[]) => !!capabilities)
      )
      .subscribe((capabilities: IdName[]) => {
        this.capabilities = capabilities;
      });
  }

  /**
   * Получение героев
   * @private
   */
  private _getHeroes(): void {
    this._observeSafe(this._appService.heroes$)
      .pipe(
        filter((heroes: Hero[]) => !!heroes)
      )
      .subscribe((heroes: Hero[]) => {
        this.heroes = heroes;
        this._filterHeroes();
      });
  }

  /**
   * Подписка на изменения формы с фильтрами
   * @private
   */
  private _subscribeOnFormChanges(): void {
    this._observeSafe(this.filterFormGroup.valueChanges)
      .subscribe(() => {
        this._filterHeroes();
      });
  }

  /**
   * Фильтрация героев
   * @param {HeroFilterForm} filterFormGroupValue - значение формы фильтров
   * @private
   */
  private _filterHeroes(filterFormGroupValue: HeroFilterForm = this.filterFormGroup.value): void {
    let filteredHeroes: Hero[] = this.heroes.filter((hero: Hero) => {
      return ((hero[HeroEnum.NAME].includes(filterFormGroupValue[HeroFilterFormEnum.NAME]) || (!filterFormGroupValue[HeroFilterFormEnum.NAME]))
        && ((hero[HeroEnum.LEVEL] >= filterFormGroupValue[HeroFilterFormEnum.MIN_LEVEL]) || (!filterFormGroupValue[HeroFilterFormEnum.MIN_LEVEL]))
        && ((hero[HeroEnum.LEVEL] <= filterFormGroupValue[HeroFilterFormEnum.MAX_LEVEL]) || (!filterFormGroupValue[HeroFilterFormEnum.MAX_LEVEL]))
        && ((filterFormGroupValue[HeroFilterFormEnum.CAPABILITY_IDS].some((item: number) => {
          return hero[HeroEnum.CAPABILITY_IDS].includes(item)
        })) || (!filterFormGroupValue[HeroFilterFormEnum.CAPABILITY_IDS].length)));
    });
    if (filterFormGroupValue[HeroFilterFormEnum.IS_SORT_BY_LEVEL]) {
      filteredHeroes = filteredHeroes.sort((a: Hero, b: Hero) => a.level > b.level ? 1 : -1);
    } else {
      filteredHeroes = filteredHeroes.sort((a: Hero, b: Hero) => a.level < b.level ? 1 : -1);
    }
    this._appService.filteredHeroes = filteredHeroes;
  }
}
