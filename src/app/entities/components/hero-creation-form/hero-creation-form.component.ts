import {Component, OnInit} from '@angular/core';
import {Service} from "src/app/entities/services/service";
import {Hero} from 'src/app/entities/interfaces/heroes';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {HeroEnum} from "../../enums/hero.enum";

@Component({
  selector: 'app-hero-creation-form',
  templateUrl: './hero-creation-form.component.html',
  styleUrls: ['./hero-creation-form.component.scss'],
})
export class HeroCreationFormComponent implements OnInit {
  public selectedHero: Hero | undefined;
  public capabilities: string[] = [];
  public heroForm: FormGroup = new FormGroup({
    [HeroEnum.NAME]: new FormControl('', Validators.required),
    [HeroEnum.POWER]: new FormControl(1, Validators.required),
    [HeroEnum.CAPABILITY_IDS]: new FormControl([], Validators.required),
    [HeroEnum.LEVEL]: new FormControl(1, Validators.required),
  });

  public HERO: typeof HeroEnum = HeroEnum;

  constructor(private readonly _service: Service) {
  }

  /**
   * Получение добавленной способности
   */
  public ngOnInit(): void {
    this._service.capabilities$.subscribe((capabilities: string[]) => {
      this.capabilities = capabilities;
    });
  }

  /**
   * Создание героя
   */
  public createHero = () => {
    this._service.addHero(this.heroForm.value)
      .subscribe({
        next: (response) => {
          this.selectedHero = response;
        },
        error: error => console.log(error),
      });
    alert("Герой добавлен!");
    this.heroForm.patchValue(Service.defaultHero);
    this._service.getHeroes();
  };
}

