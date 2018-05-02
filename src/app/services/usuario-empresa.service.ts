import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppModule } from '../app.module';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AuthService} from './auth.service';

@Injectable()
export class UsuarioEmpresaService {
  private urlApi = AppModule.getUrl() + '/empresas';
  private  token = AppModule.getToken();

  constructor(private http: Http, private auth: AuthService) { }

  getEmpresas(): Observable<any> {
    return this.http.get(this.urlApi + '/getEmpresas.json?token=' + this.auth.getToken())
      .map(this.extractData)
      .catch(this.handleError);
  }

  delete(user_id: number, codEmpresa: number): Observable<any> {
    const body = 'user_id=' + user_id + '&codEmpresa=' + codEmpresa;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers});
    return this.http.post(AppModule.getUrl() + '/usuarioempresa/delete.json?token=' + this.auth.getToken(), body, options)
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
