import {Component, OnInit} from '@angular/core';
import {Service} from "src/app/entities/services/service";
import {FormControl, Validators} from "@angular/forms";


@Component({
  selector: 'app-add-ability',
  templateUrl: './add-ability.component.html',
  styleUrls: ['./add-ability.component.scss'],
})
export class AddAbilityComponent {
  public capability: FormControl = new FormControl(null, Validators.required);

  constructor(private readonly _service: Service) {
  }

  /**
   * Добавление способности
   */
  public addCapability = () => {
    this._service.addCapability(this.capability.value);
    this.capability.setValue('');
    alert("Способность добавлена!");
  };
}




