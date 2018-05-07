import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from '../../../services/empresa.service';
import { AppComponent } from '../../../app.component';
import { AuthService } from '../../../services/auth.service';
import { Http } from '@angular/http';
import {Empresa} from '../../../services/empresas';

@Component({
  templateUrl: './empresas-add.component.html',
  styleUrls: ['./empresas-add.component.css']
})

export class EmpresasAddComponent implements OnInit {

  title: string;
  error: string = null;
  empresa: Empresa = new Empresa;
  titleNotification: string;
  contentNotification: string;
  typeNotification: string;

  constructor( private http: Http, private emp: EmpresaService, private app: AppComponent,
    private auth: AuthService, private router: Router) {
    app.logged = this.auth.loggedIn();
  }

  ngOnInit() {
    this.title = 'Adicionar Empresa';
  }

  add(): boolean {

    console.log(this.empresa);

    this.emp.add(this.empresa).subscribe(
      (retorno) => {
        this.titleNotification = 'Adicionar Empresa';
        if (retorno.message === 'success') {
          this.contentNotification = 'Empresa adicionada com sucesso!';
          this.typeNotification = 'success';
          this.app.createNotify(this.titleNotification, this.contentNotification, this.typeNotification);
          // console.log(retorno);
          this.router.navigate(['admin/empresas']);
        } else {
          this.error = 'Acesso negado';
          this.contentNotification = 'Não foi possível adicionar a Empresa!';
          this.typeNotification = 'warn';
          this.app.createNotify(this.titleNotification, this.contentNotification, this.typeNotification);
        }
      },
      error => {
        (error) = this.error = error;
      });
    return true;
  }

}
