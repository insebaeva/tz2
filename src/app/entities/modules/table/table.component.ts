import {Component, OnInit} from '@angular/core';
import {AppService} from "../../services/app.service";
import {Hero} from "../main/entities/interfaces/hero.interface";
import {filter} from "rxjs";
import {AppComponentClass} from "../../classes/app-component.class";
import {IdName} from "../../interfaces/id-name.interface";
import {MainLib} from "../main/entities/libs/main.lib";
import {HeroEnum} from "../main/entities/enums/hero.enum";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends AppComponentClass implements OnInit {
  public heroes: Hero[] = [];
  public capabilities: IdName[] = [];
  public selectedHero: Hero = MainLib.defaultHero;
  public visibleEditDialog: boolean = false;
  public visibleDeleteDialog: boolean = false;
  public editDialogMode: string = '';
  public titleEdit: string = '';
  public titleConfirmationDeletion: string = '';

  public HERO: typeof HeroEnum = HeroEnum;

  constructor(
    private readonly _appService: AppService,
  ) {
    super();
  }

  public ngOnInit(): void {
    this._loadHeroes();
    this._getHeroes();
    this._getCapabilities();
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
      });
  }

  /**
   * Загрузка героев
   * @private
   */
  private _loadHeroes() {
    this._appService.loadHeroes();
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
   * Открыть окно редактирования
   * @private
   */
  private _showEditDialog(): void {
    this.visibleEditDialog = true;
    this.editDialogMode = 'edit';
    this.titleEdit = 'Редактирование героя';
  }

  /**
   * Открыть окно просмотра
   * @private
   */
  private _showViewDialog(): void {
    this.visibleEditDialog = true;
    this.editDialogMode = 'view';
    this.titleEdit = 'Просмотр героя';
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
   * Показать выбранного героя
   */
  public showHero(selectedHero: Hero): void {
    this._appService.selectedHero = selectedHero;
    this._showViewDialog();
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
   * Открыть окно подтверждения удаления
   * @param selectedHero выбранный герой
   */
  public showDeleteConfirmationHero(selectedHero: Hero): void {
    this.selectedHero = selectedHero;
    this.visibleDeleteDialog = true;
    this.titleConfirmationDeletion = 'Вы уверены что хотите удалить героя?';
  }

  /**
   * Отправка выбранного героя на сервис для удаления
   */
  public deleteHero = () => {
    this._appService.deleteHero(this.selectedHero.id)
      .then((deletedHero: Hero | null) => {
        if (deletedHero) {
          this._appService.loadHeroes();
        }
      });
  }

  /**
   * Закрыть окно редактирования
   */
  public closeEditDialog(): void {
    this.visibleEditDialog = false;
  }

  /**
   * Закрыть окно удаления
   */
  public closeDeleteDialog(): void {
    this.visibleDeleteDialog = false;
  }
}
