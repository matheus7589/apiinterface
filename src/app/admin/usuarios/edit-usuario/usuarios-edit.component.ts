import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../services/usuarios';
import { AppComponent } from '../../../app.component';
import { AuthService } from '../../../services/auth.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/switchMap';

@Component({
  // selector: 'app-usuarios',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.css']
})
export class UsuariosEditComponent implements OnInit {

  title: string;
  error: string = null;
  usuario: Usuario = new Usuario;

  constructor( private http: Http, private user: UsuarioService,
    private app: AppComponent, private auth: AuthService, private route: ActivatedRoute) {
    app.logged = this.auth.loggedIn();
    this.getUser();

    console.log(this.usuario);
  }

  ngOnInit() {
    this.title = 'Usuários';
  }

  getUser() {

    const id = this.route.snapshot.paramMap.get('id');
    this.user.get(Number(id)).subscribe(
      (retorno) => {
        if (retorno) {
          retorno = retorno.usuario;
          this.usuario.id = retorno.Id;
          if(retorno.nome == null || retorno.nome === '') {
            retorno.nome = ' ';
          }
          this.usuario.nome = retorno.nome;
          this.usuario.email = retorno.email;
          console.log(retorno);
        }
      });
  }

  enviar(nome: string, password: string, email: string, id: number): boolean {
    let usuario: Usuario;
    usuario = new Usuario();
    usuario.id = id;
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
