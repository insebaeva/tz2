import { Component } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
@Component({
  selector: 'app-hero-filter',
  templateUrl: './hero-filter.component.html',
  styleUrls: ['./hero-filter.component.scss']
})
export class HeroFilterComponent {
  heroes: string = "";
  response: any;
  constructor() {
  }
}
