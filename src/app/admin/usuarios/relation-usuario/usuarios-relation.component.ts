import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { AppComponent } from '../../../app.component';
import { AuthService } from '../../../services/auth.service';
import { UsuarioEmpresaService } from '../../../services/usuario-empresa.service';
import { EmpresaService } from '../../../services/empresa.service';
import { Http } from '@angular/http';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
// Notificacoes
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
  };

  constructor( private http: Http, private user: UsuarioService, private app: AppComponent,
    private auth: AuthService, private router: Router, private userEmp: UsuarioEmpresaService,
    private route: ActivatedRoute, private notif: NotificationsService, private emp: EmpresaService) {

    app.logged = this.auth.loggedIn();

  }

  ngOnInit() {
    this.title = 'Usuários';

    const id = this.route.snapshot.paramMap.get('id');
    this.emp.index().subscribe(
      (retorno) => {
        if (retorno.message === 'success') {
          retorno = retorno.usuarioEmpresas;
          for (const a of retorno) {
              this.empresas = [... this.empresas, { item_id: a.codEmpresa, item_text: a.nomeEmpresa }];
          }
          console.log(this.empresas);
        }
      });

    // const selecionadas = JSON.parse(localStorage.getItem('empresas'));
    // let selecionadas = [];

    this.userEmp.getEmpresas(Number(id)).subscribe(
      (retorno) => {
        if (retorno.message === 'success') {
          retorno = retorno.usuarioEmpresas;
          for (const b of retorno) {
            this.selectedItems = [... this.selectedItems, { item_id: b.codEmpresa, item_text: b.nome }];
          }
        } else {
          console.log('erro');
        }
      }
    );

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
      const id = Number(this.route.snapshot.paramMap.get('id'));
      const codEmpresa = item['item_id'];
      const nome = item['item_text'];
      this.addEmpresaStorage(item, id);
      let title: string;
      let content: string;
      let type: string;

      this.userEmp.addRelation(id, codEmpresa, nome).subscribe(
        (retorno) => {
            title = 'Adicionar Empresa';
            if (retorno.message === 'success') {
              content = 'Empresa adicionada com sucesso!';
              type = 'success';
              this.createNotify(title, content, type, this.notificationSettings);
            } else {
              content = retorno.message;
              type = 'warn';
              this.createNotify(title, content, type, this.notificationSettings);
            }

        }
      );
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

    this.userEmp.deleteRelation(id, codEmpresa).subscribe(
        (retorno) => {
          title = 'Remover Empresa';
          if (retorno.message === 'Sucess') {
             content = 'Empresa removida com sucesso!';
             type = 'success';
             this.createNotify(title, content, type, this.notificationSettings);

          } else {
            content = 'Não foi possível remover a empresa!';
            type = 'warn';
            this.createNotify(title, content, type, this.notificationSettings);
          }
    });
    // console.log(item['item_id'], id);
  }

  createNotify(title: any, content: any, type: any, settings: any) {
      this.notif.create(title, content, type, settings);
  }

  delEmpresaStorage(search: any) {
    const empresas = JSON.parse(localStorage.getItem('empresas'));
    for (const a in empresas) {
      if (empresas[a]['codEmpresa'] === search) {
          // console.log('achou!');
          // delete empresas['codEmpresa'];
          empresas.splice(a, 1);
      }
    }
    localStorage.setItem('empresas', JSON.stringify(empresas));
  }

  addEmpresaStorage(item: any, id: number) {
    const empresasJson = JSON.parse(localStorage.getItem('empresas'));
    const count = Object.keys(empresasJson).length;
    empresasJson[count] = {
      'user_id': id,
      'codEmpresa': item['item_id'],
      'nome': item['item_text'],
    };
    localStorage.setItem('empresas', JSON.stringify(empresasJson));
  }

}
