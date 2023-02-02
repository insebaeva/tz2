import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HeroCreationFormComponent} from './entities/components/hero-creation-form/hero-creation-form.component';
import {CapabilityCreationComponent} from './entities/components/capability-creation/capability-creation.component';
import {HeroFilterFormComponent} from './entities/components/hero-filter-form/hero-filter-form.component';
import {HeroListComponent} from './entities/components/hero-list/hero-list.component';
import {DevExtremeModule, DxToolbarModule} from 'devextreme-angular';
import {AppService} from "./entities/services/app.service";
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from "@angular/common";
import {HeroEditDialogComponent} from './entities/components/hero-edit-dialog/hero-edit-dialog.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HeroCreationFormComponent,
    CapabilityCreationComponent,
    HeroFilterFormComponent,
    HeroListComponent,
    HeroEditDialogComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    DevExtremeModule,
    ReactiveFormsModule,
    DxToolbarModule
  ],
  providers: [AppService]
})
export class AppModule {
}
