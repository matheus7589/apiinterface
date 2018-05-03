import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../services/usuarios';
import { AppComponent } from '../../../app.component';
import { AuthService } from '../../../services/auth.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AgGridNg2 } from 'ag-grid-angular';
import 'ag-grid-enterprise';

@Component({
  // selector: 'app-usuarios',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})

export class UsuariosListComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridNg2;
  private gridApi;
  private gridColumnApi;
  title: string;
  usuarios: any;
  // columnDefs = [
  //   {headerName: 'Id', field: 'id', checkboxSelection: true },
  //   {headerName: 'Nome', field: 'nome' },
  //   {headerName: 'E-mail', field: 'email'},
  //   {headerName: 'Opções', field: 'opt'},
  // ];
  // rowData = [];

  constructor( private http: Http, private user: UsuarioService, private app: AppComponent,
    private auth: AuthService, private router: Router) {
    app.logged = this.auth.loggedIn();
    this.getUsuarios();
  }

  ngOnInit() {
    this.title = 'Usuários';
  }

  getUsuarios() {
    this.user.view().subscribe(
      (retorno) => {
        if (retorno) {
          // retorno = retorno.usuario;
          // for (const a of retorno) {
          //   this.rowData = [...this.rowData, {id: a.Id, nome: a.nome, email: a.email, opt: 'nada'}];
          // }
          // console.log(retorno);
          this.usuarios = retorno.usuario;

        }
    });
  }

  refresh() {
    this.router.navigate(['admin/usuarios']);
    this.ngOnInit();
  }


  edit(userid: number) {
     this.router.navigate(['admin/usuarios/edit/' + userid]);
  }

  delet(userid: number) {
    // this.user.delete(userid).subscribe(
    //   (retorno) => {
    //      if (retorno.message === 'success') {
    //        console.log('O usuário foi deletado');
    //        // this.refresh();
    //      } else {
    //        console.log(retorno.message);
    //      }
    //   });
    const usuarios = this.usuarios;
    for (const i in usuarios) {
      if (usuarios[i]['Id'] === userid) {
        usuarios.splice(i, 1);
      }
    }
  }

  add() {
    this.router.navigate(['admin/usuarios/add']);
  }

  relate(id: any) {
    this.router.navigate(['admin/usuarios/relation/' + id]);
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data );
    const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', function() {
      setTimeout(function() {
        params.api.sizeColumnsToFit();
      });
    });
  }

}
