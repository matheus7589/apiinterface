import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../services/usuarios';
import { AppComponent } from '../../../app.component';
import { AuthService } from '../../../services/auth.service';
import { Http } from '@angular/http';
import { NotificationsService } from 'angular2-notifications';

@Component({
  templateUrl: './empresas-add.component.html',
  styleUrls: ['./empresas-add.component.css']
})

export class EmpresasAddComponent implements OnInit {

  title: string;
  error: string = null;
  notificationSettings = {
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 50,
    animate: 'fromRight'
  };

  constructor( private http: Http, private user: UsuarioService, private app: AppComponent,
    private auth: AuthService, private router: Router, private notif: NotificationsService) {
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
    let title: string;
    let content: string;
    let type: string;

    this.user.add(usuario).subscribe(
      (retorno) => {
        title = 'Adicionar Usuário';
        if (retorno.message === 'success') {
          content = 'Usuário adicionado com sucesso!';
          type = 'success';
          this.createNotify(title, content, type, this.notificationSettings);
          // console.log(retorno);
          this.router.navigate(['admin/usuarios']);
        } else {
          this.error = 'Acesso negado';
          content = 'Não foi possível adicionar o usuário. E-mail já existe!';
          type = 'warn';
          this.createNotify(title, content, type, this.notificationSettings);
        }
      },
      error => {
        (error) = this.error = error;
      });
    return true;
  }

  createNotify(title: any, content: any, type: any, settings: any) {
    this.notif.create(title, content, type, settings);
  }

}
