import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../services/usuarios';
import { AppComponent } from '../../../app.component';
import { AuthService } from '../../../services/auth.service';
import { UsuarioEmpresaService } from '../../../services/usuario-empresa.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

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

  constructor( private http: Http, private user: UsuarioService, private app: AppComponent,
    private auth: AuthService, private router: Router, private userEmp: UsuarioEmpresaService, private route: ActivatedRoute) {
    app.logged = this.auth.loggedIn();
  }

  ngOnInit() {
    this.title = 'Usuários';

    // const id = this.route.snapshot.paramMap.get('id');
    // this.userEmp.getEmpresas().subscribe(
    //   (retorno) => {
    //     if (retorno) {
    //       retorno = retorno.usuarioEmpresas;
    //       let i = 1;
    //       for (const a of retorno) {
    //           this.empresas.push({ item_id: i, item_text: a.nome });
    //           i++;
    //       }
    //       console.log(this.empresas);
    //     }
    //   });

    // let i = 1;
    // for (const a of auxEmp) {
    //     this.empresas.push({ item_id: i, item_text: a.nome });
    //     i++;
    // }
    // this.empresas = this.userEmp.empresas;


    this.empresas = [
            { item_id: 1, item_text: 'Mumbai' },
            { item_id: 2, item_text: 'Bangaluru' },
            { item_id: 3, item_text: 'Pune' },
            { item_id: 4, item_text: 'Navsari' },
            { item_id: 5, item_text: 'New Delhi' }
        ];

    console.log(this.empresas);
    this.empresas = this.userEmp.empresas;
    console.log(this.empresas, 'aqui');
    this.selectedItems = [
        { item_id: 3, item_text: 'Jason Info' },
        { item_id: 4, item_text: 'Navsari' }
    ];

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
    console.log(item);
  }

}
