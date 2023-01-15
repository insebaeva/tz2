import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Hero} from 'src/app/entities/interfaces/heroes'
import {BehaviorSubject, Observable, lastValueFrom} from "rxjs";
import {HeroEnum} from "../enums/hero.enum";

@Injectable({
  providedIn: "root"
})

export class Service {
  public capabilities: string[] = [
    'one',
    'two',
    'three',
    'for'
  ];
  public static readonly defaultHero: Hero = {
    [HeroEnum.NAME]: '',
    [HeroEnum.POWER]: 1,
    [HeroEnum.CAPABILITY_IDS]: [],
    [HeroEnum.LEVEL]: 1,
    [HeroEnum.ID]: 0
  };

  private _capabilities$$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.capabilities);
  public capabilities$: Observable<string[]> = this._capabilities$$.asObservable();

  private _selectedHero$$: BehaviorSubject<Hero> = new BehaviorSubject<Hero>(Service.defaultHero);
  public selectedHero$: Observable<Hero> = this._selectedHero$$.asObservable();

  private _heroes: Hero[] = [];
  public heroes$$: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);

  constructor(private _http: HttpClient) {
  }


  /**
   * Добавление новой способности в массив способностей
   * @param capability новая способность
   */
  public addCapability(capability: string): void {
    this.capabilities.push(capability);
    this._capabilities$$.next([...this.capabilities]);
  }

  /**
   * Добавление героя на сервер
   * @param heroFormValue данные о герое
   */
  public addHero(heroFormValue: Hero): Observable<Hero> {

    return this._http.post<Hero>('http://127.0.0.1:3000/items', heroFormValue);

  }

  /**
   * Редактирование героя на сервере
   * @param id идентификатор героя
   * @param heroFormValue отредактированные данные о герое
   */
  public editHero(id: number, heroFormValue: Hero): Observable<Hero> {
    return this._http.put<Hero>(`http://127.0.0.1:3000/items/${id}`, heroFormValue);
  }

  /**
   * Получение героев с сервера
   */
  public getHeroes(): void {
    lastValueFrom(this._http.get<Hero[]>('http://127.0.0.1:3000/items'))
      .then((response: Hero[]) => {
        this._heroes = response
        this.heroes$$.next(this._heroes)
      })
      .catch(reason => {
        console.log(reason)
      })

  }

  /**
   * Получение выбранного героя при редактировании
   * @param selectedHero выбранный герой
   */
  public setSelectedHero(selectedHero: Hero): void {
    this._selectedHero$$.next(selectedHero);
  }


}


