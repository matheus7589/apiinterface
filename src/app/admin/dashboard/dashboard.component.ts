import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { AppComponent } from '../../app.component';
import { AuthService } from '../../services/auth.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title: string;

  constructor( private http: Http, private user: UsuarioService, private app: AppComponent, private auth: AuthService) {
    app.logged = this.auth.loggedIn();
  }

  ngOnInit() {
    this.title = 'Usuários';
  }


}
