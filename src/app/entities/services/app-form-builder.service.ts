import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HeroEnum} from "../enums/hero.enum";
import {HeroFilterFormEnum} from "../enums/hero-filter-form.enum";

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
      [HeroEnum.NAME]: new FormControl('', Validators.required),
      [HeroEnum.POWER]: new FormControl(1, Validators.required),
      [HeroEnum.CAPABILITY_IDS]: new FormControl([], Validators.required),
      [HeroEnum.LEVEL]: new FormControl(1, Validators.required),
      [HeroEnum.ID]: new FormControl(0, Validators.required),
    })
  }

  public getDefaultFilterFormGroup(): FormGroup {
    return this._formBuilder.group({
      [HeroFilterFormEnum.MIN_LEVEL]: new FormControl(),
      [HeroFilterFormEnum.MAX_LEVEL]: new FormControl(),
      [HeroFilterFormEnum.NAME]: new FormControl(''),
      [HeroFilterFormEnum.CAPABILITY_IDS]: new FormControl([]),
      [HeroFilterFormEnum.IS_SORT_BY_LEVEL]: new FormControl(false),
    })
  }
}



