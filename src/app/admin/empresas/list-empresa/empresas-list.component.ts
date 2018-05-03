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
  templateUrl: './empresas-list.component.html',
  styleUrls: ['./empresas-list.component.css']
})

export class EmpresasListComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridNg2;
  private gridApi;
  private gridColumnApi;
  title: string;
  usuarios: any;

  constructor( private http: Http, private user: UsuarioService, private app: AppComponent,
    private auth: AuthService, private router: Router) {
    app.logged = this.auth.loggedIn();
    this.getUsuarios();
  }

  ngOnInit() {
    this.title = 'Empresas';
  }

  getUsuarios() {
    this.user.view().subscribe(
      (retorno) => {
        if (retorno) {
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


}
