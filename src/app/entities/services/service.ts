import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Hero} from 'src/app/entities/interfaces/heroes'
import {BehaviorSubject, Observable, lastValueFrom, subscribeOn, observable} from "rxjs";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: "root"
})

export class Service {
  public capabilities: string[] = [
    'one',
    'two',
    'three',
    'for'
  ];
  private _capabilitiesSubject$$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.capabilities);
  public capabilitiesChanged$: Observable<string[]> = this._capabilitiesSubject$$.asObservable();
  public receivedHeroes: Hero[] = [];
  public heroes$$: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>(this.receivedHeroes);
  // public capabilitiesChanged$:Observable<string> = new Observable((subscriber) => {
  //  subscriber.next(this.capabilitiesSubject$.getValue());
  // });

  constructor(private http: HttpClient) {
  }


  public getCapabilities(capability: string): void {
    this.capabilities.push(capability);
    this._capabilitiesSubject$$.next([...this.capabilities, capability]);
  }

  public postHeroes(myForm: FormGroup) {

    const body: Hero = myForm.value;
    return this.http.post('http://127.0.0.1:3000/items', body);

  }


  public getHero(): void {
    lastValueFrom(this.http.get<Hero[]>('http://127.0.0.1:3000/items'))
      .then(response => {
        console.log(response)
        this.receivedHeroes = response;
        this.heroes$$.next(this.receivedHeroes)
      })
      .catch(reason => {
        console.log(reason)
      })

  }


}


