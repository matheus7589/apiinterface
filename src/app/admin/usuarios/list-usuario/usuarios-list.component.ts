import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../services/usuarios';
import { AppComponent } from '../../../app.component';
import { AuthService } from '../../../services/auth.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  // selector: 'app-usuarios',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})

export class UsuariosListComponent implements OnInit {

  title: string;
  usuarios: any;

  constructor( private http: Http, private user: UsuarioService, private app: AppComponent,
    private auth: AuthService, private router: Router) {
    app.logged = this.auth.loggedIn();
    this.getUsuarios();
  }

  ngOnInit() {
    this.title = 'Usuários';
  }

  getUsuarios(){
    this.user.view().subscribe(
      (retorno) => {
        if (retorno) {
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
    this.user.delete(userid).subscribe(
      (retorno) => {
         if (retorno) {
           this.refresh();
         }
      });
  }

}
