import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../services/auth-guard.service';

import { UsuariosComponent } from './usuarios.component';
import { UsuariosEditComponent } from './edit-usuario/usuarios-edit.component';
import { UsuariosListComponent } from './list-usuario/usuarios-list.component';
import { UsuariosAddComponent } from './add-usuario/usuarios-add.component';
import { UsuariosRelationComponent } from './relation-usuario/usuarios-relation.component';

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
          { path: 'edit/:id', component: UsuariosEditComponent },
          { path: 'relation/:id', component: UsuariosRelationComponent },
          { path: 'add', component: UsuariosAddComponent },
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
