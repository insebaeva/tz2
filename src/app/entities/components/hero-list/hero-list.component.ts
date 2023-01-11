import {Component, OnInit} from '@angular/core';
import {Service} from 'src/app/entities/services/service';
import {Hero} from 'src/app/entities/interfaces/heroes'

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
  providers: [Service]
})

export class HeroListComponent implements OnInit {

  public receivedHeroes: Hero[] = [];

  constructor(private service: Service) {
  }

  ngOnInit() {
    this.service.getHero()
    this.service.heroes$$.subscribe((receivedHeroes) => {
        this.receivedHeroes = receivedHeroes;
        console.log(this.receivedHeroes)
      }
    )
  }

}
