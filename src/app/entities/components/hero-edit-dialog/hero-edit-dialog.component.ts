import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AppService} from "../../services/app.service";
import {Hero} from 'src/app/entities/interfaces/hero.interface'
import {FormGroup} from "@angular/forms";
import {HeroEnum} from "../../enums/hero.enum";
import {IdName} from "../../interfaces/id-name.interface";
import {AppLib} from "../../libs/app.lib";
import {AppFormBuilderService} from "../../services/app-form-builder.service";
import {AppComponentClass} from "../../classes/app-component.class";
import {filter} from "rxjs";

@Component({
  selector: 'app-hero-edit-dialog',
  templateUrl: './hero-edit-dialog.component.html',
  styleUrls: ['./hero-edit-dialog.component.scss']
})
export class HeroEditDialogComponent extends AppComponentClass implements OnInit {
  @Output() newItemEvent = new EventEmitter<null>();

  public heroFormGroup: FormGroup = this._appFormBuilderService.getDefaultHeroFormGroup();

  public capabilities: IdName[] = [];

  public HERO: typeof HeroEnum = HeroEnum;

  constructor(
    private readonly _appService: AppService,
    private readonly _appFormBuilderService: AppFormBuilderService,
  ) {
    super();
  }

  public ngOnInit(): void {
    this._getHero();
    this._getCapabilities();
  }

  /**
   * Закрыть диалоговое окно
   * @private
   */
  private _close(): void {
    this.newItemEvent.emit();
  }

  /**
   * Получение выбранного героя
   * @private
   */
  private _getHero(): void {
    this._observeSafe(this._appService.selectedHero$)
      .subscribe((selectedHero: Hero) => {
        this.heroFormGroup.patchValue(selectedHero);
      });
  }

  /**
   * Получение способностей с сервера
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
   * Редактирование героя
   */
  public saveHero = () => {
    this._appService.editHero(this.heroFormGroup.value)
      .then((editedHero: Hero | null) => {
        if (editedHero) {
          this.heroFormGroup.patchValue(AppLib.defaultHero);
          this._appService.getHeroes();
          this._close();
        }
      });
  };
}
