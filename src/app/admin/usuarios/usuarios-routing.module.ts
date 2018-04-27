import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../services/auth-guard.service';

import { UsuariosComponent } from './usuarios.component';
import { UsuariosEditComponent } from './edit-usuario/usuarios-edit.component';
import { UsuariosListComponent } from './list-usuario/usuarios-list.component';

const usuariosRoutes: Routes = [
  {
    path: 'admin/usuarios',
    component: UsuariosComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: '', component: UsuariosListComponent },
          { path: 'edit', component: UsuariosEditComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(usuariosRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsuariosRoutingModule {}
