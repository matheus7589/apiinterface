import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../services/auth-guard.service';

import { EmpresasComponent } from './empresas.component';
import { EmpresasListComponent } from './list-empresa/empresas-list.component';
import { EmpresasEditComponent } from './edit-empresa/empresas-edit.component';
import { EmpresasAddComponent } from './add-empresa/empresas-add.component';


const empresasRoutes: Routes = [
  {
    path: 'admin/empresas',
    component: EmpresasComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: '', component: EmpresasListComponent },
          { path: 'edit/:id', component: EmpresasEditComponent },
          { path: 'add', component: EmpresasAddComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(empresasRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class EmpresasRoutingModule {}
