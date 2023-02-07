import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Hero} from 'src/app/entities/modules/main/entities/interfaces/hero.interface'
import {BehaviorSubject, lastValueFrom, Observable} from "rxjs";
import {HeroEnum} from "../modules/main/entities/enums/hero.enum";
import {IdName} from "../interfaces/id-name.interface";
import {MainLib} from "../modules/main/entities/libs/main.lib";

@Injectable({
  providedIn: "root"
})

export class AppService {
  private _capabilities$$: BehaviorSubject<IdName[]> = new BehaviorSubject<IdName[]>([]);
  public capabilities$: Observable<IdName[]> = this._capabilities$$.asObservable();

  private _selectedHero$$: BehaviorSubject<Hero> = new BehaviorSubject<Hero>(MainLib.defaultHero);
  public selectedHero$: Observable<Hero> = this._selectedHero$$.asObservable();

  private _heroes$$: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);
  public heroes$: Observable<Hero[]> = this._heroes$$.asObservable();

  private _filteredHeroes$$: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);
  public filteredHeroes$: Observable<Hero[]> = this._filteredHeroes$$.asObservable();

  constructor(
    private readonly _http: HttpClient
  ) {
  }

  /**
   * Установка отфильтрованных героев
   * @param {Hero[]} filteredHeroes
   */
  public set filteredHeroes(filteredHeroes: Hero[]) {
    this._filteredHeroes$$.next(filteredHeroes);
  }

  /**
   * Установка выбранного героя при редактировании
   * @param {Hero} selectedHero - выбранный герой
   */
  public set selectedHero(selectedHero: Hero) {
    this._selectedHero$$.next(selectedHero);
  }

  /**
   * Добавление новой способности в массив способностей
   * @param {string} capabilityName - наименование новой способности
   */
  public addCapability(capabilityName: string): void {
    const capability: IdName = {
      id: new Date().getTime(),
      name: capabilityName
    };
    const capabilities: IdName[] = this._capabilities$$.getValue();
    capabilities.push(capability);
    this._capabilities$$.next(capabilities);
  }

  /**
   * Добавление героя на сервер
   * @param {Hero} heroFormValue - данные о герое
   */
  public addHero(heroFormValue: Hero): Promise<Hero | null> {
    return lastValueFrom(this._http.post<Hero>('http://127.0.0.1:3000/items', heroFormValue))
      .catch((reason: any) => {
        console.error(reason);
        return null;
      });
  }

  /**
   * Редактирование героя на сервере
   * @param {Hero} heroFormValue - отредактированные данные о герое
   */
  public editHero(heroFormValue: Hero): Promise<Hero | null> {
    return lastValueFrom(this._http.put<Hero>(`http://127.0.0.1:3000/items/${heroFormValue[HeroEnum.ID]}`, heroFormValue))
      .catch((reason: any) => {
        console.error(reason);
        return null;
      });
  }

  /**
   * Удаление героя на сервере
   * @param {number} id - идентификатор героя
   */
  public deleteHero(id: number): Promise<Hero | null> {
    return lastValueFrom(this._http.delete<Hero>(`http://127.0.0.1:3000/items/${id}`))
      .catch((reason: any) => {
        console.error(reason);
        return null;
      });
  }

  /**
   * Получение героев с сервера
   */
  public loadHeroes(): void {
    lastValueFrom(this._http.get<Hero[]>('http://127.0.0.1:3000/items'))
      .then((heroes: Hero[]) => {
        this._heroes$$.next(heroes);
      })
      .catch((reason: any) => {
        console.error(reason);
      });
  }
}


