import {Component, OnInit} from '@angular/core';
import {Service} from "src/app/entities/services/service";
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-add-ability',
  templateUrl: './add-ability.component.html',
  styleUrls: ['./add-ability.component.scss'],
  providers: [Service]
})
export class AddAbilityComponent implements OnInit {

  public capability: string = "";
  private _receivedCapabilities: string[] = [];
  userCapability : FormControl = new FormControl ()
  constructor(private service: Service) {
  }

  ngOnInit() {
    this.service.capabilitiesChanged$.subscribe(capabilities => {
      this._receivedCapabilities = capabilities;
    })
    console.log(this._receivedCapabilities)
  }

  public addCapability(): void {
    if (!this.userCapability.value) {
      alert("Данные введены некорректно")
    } else {console.log(this.userCapability.value);
      this.service.getCapabilities(this.userCapability.value);
      this.capability = "";
      alert("Способность добавлена!")
    }
  }
}




