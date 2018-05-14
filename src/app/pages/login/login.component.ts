import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AppComponent } from '../../app.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string;
  error: string = null;
  titleNot: string = 'Login';
  contentNot: string;
  typeNot: string;


  constructor( private auth: AuthService, private  router: Router, private app: AppComponent) { }

  ngOnInit() {
    this.title = 'Login';
    if (this.auth.loggedIn()) {
      this.router.navigate(['admin/']);
    }
  }

  public login(email: string, password: string) {

    this.auth.login(email, password).subscribe(
      (retorno) => {
        if (retorno) {
          this.contentNot = 'Acesso Permitido!';
          this.typeNot = 'success';
          this.app.createNotify(this.titleNot, this.contentNot, this.typeNot);
          this.router.navigate(['admin/']);
        } else {
          this.error = 'Acesso negado';
        }
      },
      error => {
        this.contentNot = 'Acesso negado!';
        this.typeNot = 'error';
        this.app.createNotify(this.titleNot, this.contentNot, this.typeNot);
        (error) = this.error = error;
      });

  }

}
