import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
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
  titleNot: string;
  contentNot: string;
  typeNot: string;

  constructor( private http: Http, private user: UsuarioService, private router: Router,
    private app: AppComponent, private auth: AuthService, private route: ActivatedRoute) {
    app.logged = this.auth.loggedIn();
    this.getUser();

    console.log(this.usuario);
  }

  ngOnInit() {
    this.title = 'Editar usuário';
  }

  getUser() {

    const id = this.route.snapshot.paramMap.get('id');
    this.user.get(Number(id)).subscribe(
      (retorno) => {
        if (retorno) {
          retorno = retorno.usuario;
          this.usuario.id = retorno.Id;
          if (retorno.nome == null || retorno.nome === '') {
            retorno.nome = ' ';
          }
          this.usuario.nome = retorno.nome;
          this.usuario.email = retorno.email;
          // console.log(retorno);
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
        this.titleNot = 'Editar Usuário';
        if (retorno.message === 'success') {
          this.contentNot = 'Usuário editado com sucesso!';
          this.typeNot = 'success';
          this.app.createNotify(this.titleNot, this.contentNot, this.typeNot);
          this.router.navigate(['admin/usuarios']);
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
