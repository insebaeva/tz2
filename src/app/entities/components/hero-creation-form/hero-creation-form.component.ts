import {Component, OnInit} from '@angular/core';
import {Service} from "src/app/entities/services/service";
import {Hero} from 'src/app/entities/interfaces/heroes';
import {FormGroup, FormControl, Validators} from "@angular/forms";
// import {ButtonCreate} from "src/app/entities/enums/enum";
@Component({
  selector: 'app-hero-creation-form',
  templateUrl: './hero-creation-form.component.html',
  styleUrls: ['./hero-creation-form.component.scss'],
  providers: [Service]
})
export class HeroCreationFormComponent implements OnInit {
  public heroes: Hero[] = [];
  public receivedUser: Object | undefined; // полученный пользователь
  public receivedCapabilities: string[] = [];
  myForm: FormGroup = new FormGroup({

    "userName": new FormControl(),
    "userPower": new FormControl(),
    "userCapabilities": new FormControl(),
    "userLevel": new FormControl()
  });

  constructor(public service: Service) {
  }

  ngOnInit() {
    this.service.capabilitiesChanged$.subscribe(capabilities => {
      this.receivedCapabilities = capabilities;
      console.log(this.receivedCapabilities);
    })
  }

  createHero(myForm: FormGroup): void {
    if ((!this.myForm.controls["userName"].value || !this.myForm.controls["userPower"].value || !this.myForm.controls["userCapabilities"].value || !this.myForm.controls["userLevel"].value)) {
      alert("Данные введены некорректно");
    } else {
      this.service.postHeroes(myForm)
        .subscribe({
          next: (response) => {
            this.receivedUser = response;
          },
          error: error => console.log(error)
        })
      alert("Герой добавлен!");
      this.heroes.push(this.myForm.value);

      this.service.getHero();
    }
  }
}

