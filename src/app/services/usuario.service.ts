import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { AppModule } from '../app.module';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UsuarioService {
  private urlApi = AppModule.getUrl() + '/usuario';
  private  token = AppModule.getToken();

  constructor(private http: Http, private auth: AuthService) { }

  setTokenFirebase(tokenFirebase: String): Observable<any> {
    const body = 'tokenFirebase=' + tokenFirebase;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.urlApi + '/setAuthFirebase/' + this.auth.getCurrentUser().Id + '.json?token=' + this.auth.getToken(),
      body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public add(usuario: any): Observable<any> {
    const body = 'nome=' + usuario.nome +
      '&senha=' + usuario.password +
    '&email=' + usuario.email;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers});

    return this.http.post(this.urlApi + '/add.json?token=' + this.auth.getToken(), body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public view(): Observable<any> {
    return this.http.get(this.urlApi + '/.json?token=' + this.auth.getToken())
      .map(this.extractData)
      .catch(this.handleError);
  }

  public get(id: number): Observable<any> {
    return this.http.get(this.urlApi + '/' + id + '.json?token=' + this.auth.getToken())
      .map(this.extractData)
      .catch(this.handleError);
  }

  public edit(usuario: any): Observable<any> {
    console.log(usuario);
    const body = 'nome=' + usuario.nome +
      '&password=' + usuario.password +
    '&email=' + usuario.email;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers});

    return this.http.post(this.urlApi + '/edit/' + usuario.id + '.json?token=' + this.auth.getToken(), body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public delete(id: number): Observable<any> {
    const body = 'user_id=' + id;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.urlApi + '/delete.json?token=' + this.auth.getToken(), body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body;
  }

  private handleError(error: any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
