import { Component } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HeroEnum} from "../../enums/hero.enum";
@Component({
  selector: 'app-hero-filter',
  templateUrl: './hero-filter.component.html',
  styleUrls: ['./hero-filter.component.scss']
})
export class HeroFilterComponent {
  public filterLevelForm: FormGroup = new FormGroup({
    minLevel: new FormControl(0, Validators.required),
    maxlevel: new FormControl(50, Validators.required),
  });

  constructor() {
  }
}
