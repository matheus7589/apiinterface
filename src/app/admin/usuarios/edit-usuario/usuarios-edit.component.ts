import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuarios } from '../../../services/usuarios';
import { AppComponent } from '../../../app.component';
import { AuthService } from '../../../services/auth.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  // selector: 'app-usuarios',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.css']
})
export class UsuariosEditComponent implements OnInit {

  title: string;
  error: string = null;

  constructor( private http: Http, private user: UsuarioService, private app: AppComponent, private auth: AuthService) {
    app.logged = this.auth.loggedIn();
  }

  ngOnInit() {
    this.title = 'Usuários';
  }

  enviar(nome: string, password: string, email: string): boolean {
    let usuario: Usuarios;
    usuario = new Usuarios();
    usuario.id = 15;
    usuario.nome = nome;
    usuario.password = password;
    usuario.email = email;

    this.user.edit(usuario).subscribe(
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
