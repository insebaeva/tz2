import {Component, OnInit} from '@angular/core';
import {Service} from 'src/app/entities/services/service';
import {Hero} from 'src/app/entities/interfaces/heroes'

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
})

export class HeroListComponent implements OnInit {

  public heroes: Hero[] = [];
  public popupVisible: boolean = false;

  constructor(private readonly _service: Service) {

  }

  /**
   * Получение героев с сервера
   */
  public ngOnInit(): void {
    this._service.getHeroes();
    this._service.heroes$$.subscribe((heroes: Hero[]) => {
      this.heroes = heroes;
    });
  }

  /**
   * Отправка выбранного героя на сервис
   * @param selectedHero выбранный герой
   */
  public editHero(selectedHero: Hero) {
    this.popupVisible = true;
    this._service.setSelectedHero(selectedHero);
  };

}
