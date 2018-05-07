import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EmpresaService } from '../../../services/empresa.service';
import { Empresa } from '../../../services/empresas';
import { AppComponent } from '../../../app.component';
import { AuthService } from '../../../services/auth.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/switchMap';

@Component({
  // selector: 'app-usuarios',
  templateUrl: './empresas-edit.component.html',
  styleUrls: ['./empresas-edit.component.css']
})
export class EmpresasEditComponent implements OnInit {

  title: string;
  error: string = null;
  empresa: Empresa = new Empresa;
  titleNotification: string;
  contentNotification: string;
  typeNotification: string;


  constructor( private http: Http, private emp: EmpresaService, private router: Router,
    private app: AppComponent, private auth: AuthService, private route: ActivatedRoute) {
    app.logged = this.auth.loggedIn();
    this.getEmpresa();

    console.log(this.empresa);
  }

  ngOnInit() {
    this.title = 'Editar usuário';
  }

  getEmpresa() {

    const id = this.route.snapshot.paramMap.get('id');
    this.emp.view(Number(id)).subscribe(
      (retorno) => {
        if (retorno) {
          retorno = retorno.empresa;
          this.empresa.id = retorno.Id;
          if (retorno.nomeEmpresa == null || retorno.nomeEmpresa === '') {
            retorno.nomeEmpresa = ' ';
          }
          this.empresa.nomeEmpresa = retorno.nomeEmpresa;
          this.empresa.codEmpresa = retorno.codEmpresa;
          this.empresa.prop = retorno.prop;
          this.empresa.monitorando = retorno.monitorando;
          this.empresa.gerar_eventos = retorno.gerar_eventos;
          this.empresa.data_expiracao = retorno.data_expiracao;
          this.empresa.codMatriz = retorno.codMatriz;
          // console.log(retorno);
        }
      });
  }

  enviar(): boolean {

    if (!this.empresa.senha) {
      this.empresa.senha = '';
    }

    this.emp.edit(this.empresa).subscribe(
      (retorno) => {
        this.titleNotification = 'Editar empresa'
        if (retorno.message === 'success') {
          this.contentNotification = 'Empresa Editada com Sucesso!';
          this.typeNotification = 'success';
          this.app.createNotify(this.titleNotification, this.contentNotification, this.typeNotification);
          this.router.navigate(['admin/empresas']);
        } else {
          this.contentNotification = 'Não foi possível editar empresa!';
          this.typeNotification = 'warn';
          this.app.createNotify(this.titleNotification, this.contentNotification, this.typeNotification);
          // this.error = 'Acesso negado';
        }
      },
      error => {
        (error) = this.error = error;
      });
    return true;
  }

}
