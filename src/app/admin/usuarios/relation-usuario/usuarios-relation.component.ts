import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../services/usuarios';
import { AppComponent } from '../../../app.component';
import { AuthService } from '../../../services/auth.service';
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
  // optionsModel: number[];
  // myOptions: IMultiSelectOption[];
  dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};
    empresas = [];

  constructor( private http: Http, private user: UsuarioService, private app: AppComponent,
    private auth: AuthService, private router: Router) {
    app.logged = this.auth.loggedIn();
  }

  ngOnInit() {
    this.title = 'Usuários';

    this.empresas = [
            { item_id: 1, item_text: 'Mumbai' },
            { item_id: 2, item_text: 'Bangaluru' },
            { item_id: 3, item_text: 'Pune' },
            { item_id: 4, item_text: 'Navsari' },
            { item_id: 5, item_text: 'New Delhi' }
        ];
    this.selectedItems = [
        { item_id: 3, item_text: 'Pune' },
        { item_id: 4, item_text: 'Navsari' }
    ];

    this.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 10,
        allowSearchFilter: true
    };
  }

  onItemSelect(item:any){
      console.log(item);
  }


  onSelectAll(items: any){
      console.log(items);
  }

}
