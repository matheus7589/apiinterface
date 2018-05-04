import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmpresasComponent } from './empresas.component';
import { EmpresasListComponent } from './list-empresa/empresas-list.component';
import { EmpresasEditComponent } from './edit-empresa/empresas-edit.component';
import { EmpresasAddComponent } from './add-empresa/empresas-add.component';

import { EmpresasRoutingModule } from './empresas-routing.module';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    AgGridModule.withComponents([]),
    CommonModule,
    FormsModule,
    EmpresasRoutingModule
  ],
  declarations: [
    EmpresasComponent,
    EmpresasListComponent,
    EmpresasEditComponent,
    EmpresasAddComponent,
  ]
})
export class EmpresasModule {}


