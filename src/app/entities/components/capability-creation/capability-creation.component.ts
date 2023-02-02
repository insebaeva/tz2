import {Component} from '@angular/core';
import {AppService} from "src/app/entities/services/app.service";
import {FormControl} from "@angular/forms";
import {AppFormBuilderService} from "../../services/app-form-builder.service";


@Component({
  selector: 'app-capability-creation',
  templateUrl: './capability-creation.component.html',
  styleUrls: ['./capability-creation.component.scss'],
})
export class CapabilityCreationComponent {
  public capabilityFormControl: FormControl<string | null> = this._appFormBuilderService.getDefaultAddCapabilityFormControl();

  constructor(
    private readonly _appService: AppService,
    private readonly _appFormBuilderService: AppFormBuilderService,
  ) {
  }

  /**
   * Добавление способности
   */
  public addCapability = () => {
    this._appService.addCapability(this.capabilityFormControl.value as string);
    this.capabilityFormControl.reset();
    alert('Способность добавлена!');
  };
}




