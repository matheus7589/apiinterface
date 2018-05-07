import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from '../../../services/empresa.service';
import { AppComponent } from '../../../app.component';
import { AuthService } from '../../../services/auth.service';
import { Http } from '@angular/http';

@Component({
  templateUrl: './empresas-list.component.html',
  styleUrls: ['./empresas-list.component.css']
})

export class EmpresasListComponent implements OnInit {

  @ViewChild('monitorando') monitorando: any;
  title: string;
  empresas: any;

  constructor( private http: Http, private emp: EmpresaService, private app: AppComponent,
    private auth: AuthService, private router: Router) {
    app.logged = this.auth.loggedIn();
    this.getEmpresas();
  }

  ngOnInit() {
    this.title = 'Empresas';
  }

  getEmpresas() {
    this.emp.index().subscribe(
      (retorno) => {
        if (retorno) {
          this.empresas = retorno.empresas;
          // console.log(this.empresas);
        }
    });
  }

  getChange() {
    console.log(this.monitorando.nativeElement.value());

  }

  refresh() {
    this.router.navigate(['admin/usuarios']);
    this.ngOnInit();
  }


  edit(empresaid: number) {
     this.router.navigate(['admin/empresas/edit/' + empresaid]);
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
    const empresas = this.empresas;
    for (const i in empresas) {
      if (empresas[i]['Id'] === userid) {
        empresas.splice(i, 1);
      }
    }
  }

  add() {
    this.router.navigate(['admin/empresas/add']);
  }

}
