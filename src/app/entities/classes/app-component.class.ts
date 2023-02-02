import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Component, OnDestroy} from "@angular/core";

@Component({
  template: ''
})

export abstract class AppComponentClass implements OnDestroy {
  protected _destroy$$: Subject<void> = new Subject();

  public ngOnDestroy(): void {
    this._destroy$$.next();
    this._destroy$$.complete();
  }

  protected _observeSafe<T>(obs: Observable<T>): Observable<T> {
    return obs.pipe(takeUntil(this._destroy$$));
  }
}

