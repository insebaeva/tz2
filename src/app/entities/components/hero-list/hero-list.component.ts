import {Component, OnInit} from '@angular/core';
import {AppService} from 'src/app/entities/services/app.service';
import {Hero} from 'src/app/entities/interfaces/hero.interface'
import {IdName} from "../../interfaces/id-name.interface";
import {AppComponentClass} from "../../classes/app-component.class";
import {filter} from "rxjs";

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
})

export class HeroListComponent extends AppComponentClass implements OnInit {
  public filteredHeroes: Hero[] = [];
  public capabilities: IdName[] = [];
  public popupVisible: boolean = false;

  constructor(
    private readonly _appService: AppService
  ) {
    super();
  }

  public ngOnInit(): void {
    this._getHeroes();
    this._getCapabilities();
  }

  /**
   * Открыть окно редактирования
   * @private
   */
  private _showEditDialog(): void {
    this.popupVisible = true;
  }

  /**
   * Получение героев
   * @private
   */
  private _getHeroes(): void {
    this._appService.getHeroes();
    this._observeSafe(this._appService.filteredHeroes$)
      .pipe(
        filter((heroes: Hero[]) => !!heroes)
      )
      .subscribe((heroes: Hero[]) => {
        this.filteredHeroes = heroes;
      });
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
   * Получение имени способности по id
   * @param {number} capabilityId - идентификатор выбранной способности
   */
  public getCapabilityNameById(capabilityId: number): string {
    const foundedCapability: IdName | undefined = this.capabilities.find((capability: IdName) => {
      return capability.id === capabilityId;
    });
    return foundedCapability ? foundedCapability.name : '';
  }

  /**
   * Отправка выбранного героя на сервис для редактирования
   * @param {Hero} selectedHero - выбранный герой
   */
  public editHero(selectedHero: Hero): void {
    this._appService.selectedHero = selectedHero;
    this._showEditDialog();
  }

  /**
   * Отправка выбранного героя на сервис для удаления
   * @param {Hero} selectedHero - выбранный герой
   */
  public deleteHero(selectedHero: Hero): void {
    this._appService.deleteHero(selectedHero.id)
      .then((deletedHero: Hero | null) => {
        if (deletedHero) {
          alert('Герой удален!');
          this._appService.getHeroes();
        }
      });
  }

  /**
   * Закрыть окно редактирования
   */
  public closeEditDialog(): void {
    this.popupVisible = false;
  }
}
