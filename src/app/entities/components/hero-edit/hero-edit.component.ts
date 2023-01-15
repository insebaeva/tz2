import {Component, OnInit} from '@angular/core';
import {Service} from "../../services/service";
import {Hero} from 'src/app/entities/interfaces/heroes'
import {FormControl, FormGroup} from "@angular/forms";
import {HeroEnum} from "../../enums/hero.enum";

@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.scss']
})
export class HeroEditComponent implements OnInit {
  public heroId: number = 0;
  public selectedHero: Hero | undefined;
  public capabilities: string[] = [];
  public heroForm: FormGroup = new FormGroup({
    [HeroEnum.NAME]: new FormControl(''),
    [HeroEnum.POWER]: new FormControl(1),
    [HeroEnum.CAPABILITY_IDS]: new FormControl([]),
    [HeroEnum.LEVEL]: new FormControl(1)
  });

  public HERO: typeof HeroEnum = HeroEnum;

  constructor(private readonly _service: Service) {

  }

  /**
   * Получение параметров о выбранном герое
   */
  public ngOnInit(): void {
    this.getHero();
    this.getCapabilities();
  }

  /**
   * Получение выбранного героя и Id с сервера
   * @private
   */
  public getHero(): void {
    this._service.selectedHero$.subscribe(selectedHero => {
      console.log(selectedHero)
      this.heroForm.patchValue(selectedHero);
      this.heroId = selectedHero.id;
    });
  }

  /**
   * Получение способностей с сервера
   * @private
   */
  public getCapabilities(): void {
    this._service.capabilities$.subscribe((capabilities: string[]) => {
      this.capabilities = capabilities;
    });
  }

  /**
   * Редактирование героя на сервере
   */
  public saveHero = () => {
    this._service.editHero(this.heroId, this.heroForm.value)
      .subscribe({
        next: (response) => {
          this.selectedHero = response;
        },
        error: error => console.log(error),
      });
    this.heroForm.patchValue(Service.defaultHero);
    this._service.getHeroes();
  };
}
