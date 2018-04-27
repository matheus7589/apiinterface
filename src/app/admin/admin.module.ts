import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { ManageUsuariosComponent } from './manage-usuarios.component';
import { UsuariosComponent } from './usuarios/edit-usuario/usuarios.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ManageUsuariosComponent,
    UsuariosComponent,
    DashboardComponent
  ]
})
export class AdminModule {}
