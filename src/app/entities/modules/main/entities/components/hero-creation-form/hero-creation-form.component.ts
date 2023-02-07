import {Component, OnInit} from '@angular/core';
import {AppService} from "src/app/entities/services/app.service";
import {FormGroup} from "@angular/forms";
import {HeroEnum} from "../../enums/hero.enum";
import {IdName} from "../../../../../interfaces/id-name.interface";
import {MainLib} from "../../libs/main.lib";
import {AppFormBuilderService} from "../../../../../services/app-form-builder.service";
import {AppComponentClass} from "../../../../../classes/app-component.class";
import {filter} from "rxjs";
import {Hero} from "../../interfaces/hero.interface";

@Component({
  selector: 'hero-creation-form',
  templateUrl: './hero-creation-form.component.html',
  styleUrls: ['./hero-creation-form.component.scss'],
})
export class HeroCreationFormComponent extends AppComponentClass implements OnInit {
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
    this._getCapabilities()
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
   * Создание героя
   */
  public createHero = () => {
    this._appService.addHero(this.heroFormGroup.value)
      .then((addedHero: Hero | null) => {
        if (addedHero) {
          alert('Герой добавлен!');
          this.heroFormGroup.patchValue(MainLib.defaultHero);
          this._appService.loadHeroes();
        }
      });
  };
}

