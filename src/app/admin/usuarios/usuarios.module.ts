import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosComponent } from './usuarios.component';
import { UsuariosEditComponent } from './edit-usuario/usuarios-edit.component'
import { UsuariosListComponent } from './list-usuario/usuarios-list.component';

// import { DashboardComponent } from './dashboard/dashboard.component';

import { UsuariosRoutingModule } from './usuarios-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UsuariosRoutingModule
  ],
  declarations: [
    UsuariosComponent,
    UsuariosEditComponent,
    UsuariosListComponent
  ]
})
export class UsuariosModule {}
