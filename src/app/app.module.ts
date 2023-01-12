import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HeroCreationFormComponent} from './entities/components/hero-creation-form/hero-creation-form.component';
import {AddAbilityComponent} from './entities/components/add-ability/add-ability.component';
import {HeroFilterComponent} from './entities/components/hero-filter/hero-filter.component';
import {HeroListComponent} from './entities/components/hero-list/hero-list.component';
import {DevExtremeModule} from 'devextreme-angular';
import {Service} from "./entities/services/service";
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from "@angular/common";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HeroCreationFormComponent,
    AddAbilityComponent,
    HeroFilterComponent,
    HeroListComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    DevExtremeModule,
    ReactiveFormsModule,
  ],
  providers: [Service]
})
export class AppModule {
}
