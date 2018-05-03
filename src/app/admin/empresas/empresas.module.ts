import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmpresasComponent } from './empresas.component';
import { EmpresasListComponent } from './list-empresa/empresas-list.component';

import { UsuarioEmpresaService } from '../../services/usuario-empresa.service';

// import { DashboardComponent } from './dashboard/dashboard.component';

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
  ]
})
export class EmpresasModule {}


