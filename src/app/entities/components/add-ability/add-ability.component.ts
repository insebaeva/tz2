import {Component, OnInit} from '@angular/core';
import {Service} from "src/app/entities/services/service";
import {FormControl, Validators} from "@angular/forms";


@Component({
  selector: 'app-add-ability',
  templateUrl: './add-ability.component.html',
  styleUrls: ['./add-ability.component.scss'],
})
export class AddAbilityComponent implements OnInit {

  private _receivedCapabilities: string[] = [];
  public heroCapability: FormControl = new FormControl(null, Validators.required)

  constructor(private readonly service: Service) {
  }

  ngOnInit() {
    this.service.capabilitiesChanged$.subscribe(capabilities => {
      this._receivedCapabilities = capabilities;
    })
  }

  public addCapability(): void {
    if (this.heroCapability.invalid) {
      alert("Данные введены некорректно")
    } else {
      this.service.getCapabilities(this.heroCapability.value);
      this.heroCapability.setValue("");
      alert("Способность добавлена!")
    }
  }
}




