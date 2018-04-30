import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsuariosComponent } from './usuarios.component';
import { UsuariosEditComponent } from './edit-usuario/usuarios-edit.component'
import { UsuariosListComponent } from './list-usuario/usuarios-list.component';
import { UsuariosAddComponent } from './add-usuario/usuarios-add.component';
import { UsuariosRelationComponent } from './relation-usuario/usuarios-relation.component';

// import { DashboardComponent } from './dashboard/dashboard.component';

import { UsuariosRoutingModule } from './usuarios-routing.module';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    FormsModule,
    UsuariosRoutingModule
  ],
  declarations: [
    UsuariosComponent,
    UsuariosEditComponent,
    UsuariosListComponent,
    UsuariosAddComponent,
    UsuariosRelationComponent,
  ]
})
export class UsuariosModule {}
