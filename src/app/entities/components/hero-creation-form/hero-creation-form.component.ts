import {Component, OnInit} from '@angular/core';
import {Service} from "src/app/entities/services/service";
import {Hero} from 'src/app/entities/interfaces/heroes';
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-hero-creation-form',
  templateUrl: './hero-creation-form.component.html',
  styleUrls: ['./hero-creation-form.component.scss'],
})
export class HeroCreationFormComponent implements OnInit {
  public heroes: Hero[] = [];
  public receivedHero: Object | undefined; // полученный пользователь
  public receivedCapabilities: string[] = [];
  public myForm: FormGroup = new FormGroup({

    heroName: new FormControl(null, Validators.required),
    heroPower: new FormControl(null, Validators.required),
    heroCapabilities: new FormControl(null, Validators.required),
    heroLevel: new FormControl(null, Validators.required)
  });

  constructor(private readonly service: Service) {
  }

  ngOnInit() {
    this.service.capabilitiesChanged$.subscribe(capabilities => {
      this.receivedCapabilities = capabilities;
    })
  }

  createHero(myForm: FormGroup): void {
    if (this.myForm.invalid) {
      alert("Данные введены некорректно");
    } else {
      this.service.postHeroes(myForm)
        .subscribe({
          next: (response) => {
            this.receivedHero = response;
          },
          error: error => console.log(error)
        })
      alert("Герой добавлен!");
      this.heroes.push(this.myForm.value);
      this.myForm.setValue({
        heroName: "",
        heroPower: "",
        heroCapabilities: "",
        heroLevel: ""
      })
      this.service.getHero();
    }
  }
}

