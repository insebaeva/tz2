import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HeroEnum} from "../modules/main/entities/enums/hero.enum";
import {HeroFilterFormEnum} from "../modules/main/entities/enums/hero-filter-form.enum";

@Injectable({
  providedIn: "root"
})

export class AppFormBuilderService {

  constructor(
    private _formBuilder: FormBuilder
  ) {
  }

  public getDefaultAddCapabilityFormControl(): FormControl<string | null> {
    return this._formBuilder.control(null, Validators.required);
  }

  public getDefaultHeroFormGroup(): FormGroup {
    return this._formBuilder.group({
      [HeroEnum.NAME]: this._formBuilder.control('', Validators.required),
      [HeroEnum.POWER]: this._formBuilder.control(1, Validators.required),
      [HeroEnum.CAPABILITY_IDS]: this._formBuilder.control([], Validators.required),
      [HeroEnum.LEVEL]: this._formBuilder.control(1, Validators.required),
      [HeroEnum.ID]: this._formBuilder.control(0, Validators.required),
    })
  }

  public getDefaultFilterFormGroup(): FormGroup {
    return this._formBuilder.group({
      [HeroFilterFormEnum.MIN_LEVEL]: this._formBuilder.control(1),
      [HeroFilterFormEnum.MAX_LEVEL]: this._formBuilder.control(null),
      [HeroFilterFormEnum.NAME]: this._formBuilder.control(''),
      [HeroFilterFormEnum.CAPABILITY_IDS]: this._formBuilder.control([]),
      [HeroFilterFormEnum.IS_SORT_BY_LEVEL]: this._formBuilder.control(false),
    })
  }
}



