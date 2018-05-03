import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string;
  error: string = null;


  constructor( private auth: AuthService, private  router: Router ) { }

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
          // this.empresasServ.setFiltro(Array(this.empresasServ.all()[0]));
          // this.setAuthFirebase();
          // this.router.navigate(['/admin']);
          this.router.navigate(['admin/']);
        } else {
          this.error = 'Acesso negado';
        }
      },
      error => {
        (error) = this.error = error;
      });

  }

}
