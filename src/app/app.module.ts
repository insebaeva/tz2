import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MainComponent} from './entities/modules/main/main.component';
import {HeroCreationFormComponent} from './entities/modules/main/entities/components/hero-creation-form/hero-creation-form.component';
import {CapabilityCreationFormComponent} from './entities/modules/main/entities/components/capability-creation/capability-creation-form.component';
import {HeroFilterFormComponent} from './entities/modules/main/entities/components/hero-filter-form/hero-filter-form.component';
import {HeroListComponent} from './entities/modules/main/entities/components/hero-list/hero-list.component';
import {DxToolbarModule} from 'devextreme-angular/ui/toolbar';
import {AppService} from "./entities/services/app.service";
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from "@angular/common";
import {HeroEditDialogComponent} from './entities/modules/main/entities/components/hero-edit-dialog/hero-edit-dialog.component';
import { PageSwitcherComponent } from './entities/components/page-switcher/page-switcher.component';
import { AppComponent } from './app.component';
import {Routes, RouterModule} from "@angular/router";
import { TableComponent } from './entities/modules/table/table.component';
import {DxSelectBoxModule} from "devextreme-angular/ui/select-box";
import {DxCheckBoxModule} from 'devextreme-angular/ui/check-box';
import {DxTagBoxModule} from 'devextreme-angular/ui/tag-box';
import {DxTextBoxModule} from 'devextreme-angular/ui/text-box';
import {DxDataGridModule} from "devextreme-angular/ui/data-grid";
import {DxButtonModule} from "devextreme-angular/ui/button";
import {DxAccordionModule} from "devextreme-angular/ui/accordion";
import {DxNumberBoxModule} from "devextreme-angular/ui/number-box";
import {DxPopupModule} from "devextreme-angular/ui/popup";
import { DeleteConfirmationDialogComponent } from './entities/components/delete-confirmation-dialog/delete-confirmation-dialog.component';

const appRoutes: Routes =[
  { path: '', component: MainComponent},
  { path: 'table', component: TableComponent},
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    MainComponent,
    HeroCreationFormComponent,
    CapabilityCreationFormComponent,
    HeroFilterFormComponent,
    HeroListComponent,
    HeroEditDialogComponent,
    PageSwitcherComponent,
    AppComponent,
    TableComponent,
    DeleteConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    DxToolbarModule,
    DxTextBoxModule,
    DxTagBoxModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxDataGridModule,
    DxButtonModule,
    DxAccordionModule,
    DxNumberBoxModule,
    DxPopupModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AppService]
})
export class AppModule {
}
