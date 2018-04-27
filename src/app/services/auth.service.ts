import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppModule } from '../app.module';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthService {

  public token: string;
  public username: string;
  public password: string;

  constructor(private http: Http) { }

  getToken() {
    if (!this.loggedIn()) {
      return null;
    } else {
      const token = JSON.parse(localStorage.getItem('token'));
      return token;
    }
  }

  loggedIn() {
    if (localStorage.getItem('user')) {
      return true;
    } else {
      return false;
    }
  }

  getCurrentUser() {
    if (!this.loggedIn()) {
      return null;
    }
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  login(username: string, password: string): Observable<boolean> {
    const body = 'email=' + username + '&senha=' + password + '&client_id=app_gestor&client_secret=3`HtcO)6L(';
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers});

    return this.http.post(AppModule.getUrl() + '/usuario/oauthFull.json', body, options)
      .map(function (response: Response) {
        const r = response.json();
        if (r.token.authorization !== '') {
          localStorage.setItem('user', JSON.stringify(r.user));
          localStorage.setItem('token', JSON.stringify(r.token.authorization));
          localStorage.setItem('empresas', JSON.stringify(r.empresas));
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
