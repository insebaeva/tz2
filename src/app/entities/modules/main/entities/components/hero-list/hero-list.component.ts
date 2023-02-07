import {Component, OnInit} from '@angular/core';
import {AppService} from 'src/app/entities/services/app.service';
import {Hero} from 'src/app/entities/modules/main/entities/interfaces/hero.interface'
import {IdName} from "../../../../../interfaces/id-name.interface";
import {AppComponentClass} from "../../../../../classes/app-component.class";
import {filter} from "rxjs";
import {MainLib} from "../../libs/main.lib";
import {DialogModeType} from "../../types/dialog-mode.type";

@Component({
  selector: 'hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
})

export class HeroListComponent extends AppComponentClass implements OnInit {
  public filteredHeroes: Hero[] = [];
  public capabilities: IdName[] = [];
  public selectedHero: Hero = MainLib.defaultHero;
  public visibleEditDialog: boolean = false;
  public visibleDeleteDialog: boolean = false;
  public editDialogMode: string = '';
  public titleEdit: string = '';
  public titleConfirmationDeletion: string = '';

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
    this.visibleEditDialog = true;
    this.editDialogMode = DialogModeType.EDIT;
    this.titleEdit = 'Редактирование героя';
  }

  /**
   * Открыть окно просмотра
   * @private
   */
  private _showViewDialog(): void {
    this.visibleEditDialog = true;
    this.editDialogMode = DialogModeType.VIEW;
    this.titleEdit = 'Просмотр героя';
  }

  /**
   * Получение героев
   * @private
   */
  private _getHeroes(): void {
    this._loadHeroes();
    this._observeSafe(this._appService.filteredHeroes$)
      .pipe(
        filter((filteredHeroes: Hero[]) => !!filteredHeroes)
      )
      .subscribe((filteredHeroes: Hero[]) => {
        this.filteredHeroes = filteredHeroes;
      });
  }

  /**
   * Загрузка героев
   * @private
   */
  private _loadHeroes(): void {
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
   * Показать выбранного героя
   */
  public showHero(selectedHero: Hero): void {
    this._appService.selectedHero = selectedHero;
    this._showViewDialog();
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
   * Закрыть окно удаления
   */
  public closeDeleteDialog(): void {
    this.visibleDeleteDialog = false;
  }

  /**
   * Закрыть окно редактирования
   */
  public closeEditDialog(): void {
    this.visibleEditDialog = false;
  }
}
