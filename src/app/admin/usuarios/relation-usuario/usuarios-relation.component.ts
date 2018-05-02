import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../services/usuarios';
import { AppComponent } from '../../../app.component';
import { AuthService } from '../../../services/auth.service';
import { UsuarioEmpresaService } from '../../../services/usuario-empresa.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
//Notificacoes
// import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';

@Component({
  // selector: 'app-usuarios',
  templateUrl: './usuarios-relation.component.html',
  styleUrls: ['./usuarios-relation.component.css']
})

export class UsuariosRelationComponent implements OnInit {

  title: string;
  error: string = null;
  selectedItems = [];
  dropdownSettings = {};
  empresas = [];
  notificationSettings = {
     timeOut: 3000,
     showProgressBar: true,
     pauseOnHover: true,
     clickToClose: true,
     maxLength: 50,
     animate: 'fromRight'
  }

  constructor( private http: Http, private user: UsuarioService, private app: AppComponent,
    private auth: AuthService, private router: Router, private userEmp: UsuarioEmpresaService,
    private route: ActivatedRoute, private notif: NotificationsService) {

    app.logged = this.auth.loggedIn();

  }

  ngOnInit() {
    this.title = 'Usuários';

    // const id = this.route.snapshot.paramMap.get('id');
    this.userEmp.getEmpresas().subscribe(
      (retorno) => {
        if (retorno) {
          retorno = retorno.usuarioEmpresas;
          for (const a of retorno) {
              this.empresas = [... this.empresas, { item_id: a.codEmpresa, item_text: a.nomeEmpresa }];
          }
          // console.log(this.empresas);
        }
      });

    let selecionadas = JSON.parse(localStorage.getItem('empresas'));
    console.log(selecionadas);

    for (const b of selecionadas) {
      this.selectedItems = [... this.selectedItems, { item_id: b.codEmpresa, item_text: b.nome }];
    }

    this.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Selecionar Todos',
        unSelectAllText: 'Desselecionar Todos',
        itemsShowLimit: 20,
        allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
      console.log(item);
  }


  onSelectAll(items: any) {
      console.log(items);
  }

  onItemDeSelect(item: any) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const codEmpresa = item['item_id'];
    this.delEmpresaStorage(codEmpresa);
    let title: string;
    let content: string;
    let type: string;

    this.userEmp.delete(id, codEmpresa).subscribe(
        (retorno) => {
          if (retorno.message === 'Sucess') {
             console.log(retorno);
             title = 'Remover Relação';
             content = 'Relação removida com sucesso';
             type = 'success';
             this.createNotify(title, content, type, this.notificationSettings);

          } else {
            title = 'Remover Relação';
            content = 'Não foi possível remover a relação!';
            type = 'warn';
            this.createNotify(title, content, type, this.notificationSettings);
          }
    });


    console.log(item['item_id'], id);
  }

  createNotify(title: any, content: any, type: any, settings: any) {
      this.notif.create(title, content, type, settings);
  }

  delEmpresaStorage(search: any){
    let empresas = JSON.parse(localStorage.getItem('empresas'));
    for (let a in empresas) {
      if (empresas[a]['codEmpresa'] == search) {
          console.log('achou!');
          // delete empresas['codEmpresa'];
          empresas.splice(a, 1);
      }
    }
    localStorage.setItem('empresas', JSON.stringify(empresas));
  }

}
