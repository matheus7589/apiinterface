import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../services/usuarios';
import { AppComponent } from '../../../app.component';
import { AuthService } from '../../../services/auth.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  // selector: 'app-usuarios',
  templateUrl: './usuarios-add.component.html',
  styleUrls: ['./usuarios-add.component.css']
})

export class UsuariosAddComponent implements OnInit {

  title: string;
  error: string = null;

  constructor( private http: Http, private user: UsuarioService, private app: AppComponent,
    private auth: AuthService, private router: Router) {
    app.logged = this.auth.loggedIn();
  }

  ngOnInit() {
    this.title = 'Usuários';
  }

  add(nome: string, password: string, email: string): boolean {
    let usuario: Usuario;
    usuario = new Usuario();
    usuario.nome = nome;
    usuario.password = password;
    usuario.email = email;
    usuario.codEmpresa = null;
    usuario.nomeEmpresa = null;
    usuario.inorte = null;

    this.user.add(usuario).subscribe(
      (retorno) => {
        if (retorno) {
          console.log(retorno);
        } else {
          this.error = 'Acesso negado';
        }
      },
      error => {
        (error) = this.error = error;
      });
    return true;
  }


}
