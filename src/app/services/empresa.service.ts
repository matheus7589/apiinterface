import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppModule } from '../app.module';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EmpresaService {
  private urlApi = AppModule.getUrl() + '/empresas';
  private token = AppModule.getToken();
  constructor(private http: Http) {}

  index(): Observable<any> {
    return this.http.get(this.urlApi + '/index.json?token=' + this.token)
      .map(this.extractData)
      .catch(this.handleError);
  }

  view(id: number): Observable<any> {
    return this.http.get(this.urlApi + '/view/' + id + '.json?token=' + this.token)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public add(empresa: any): Observable<any> {
    const body = 'nomeEmpresa=' + empresa.nomeEmpresa +
      '&senha=' + empresa.senha + '&prop=' + empresa.prop +
      '&codEmpresa=' + empresa.codEmpresa + '&monitorando=0' + '&gerar_eventos=0';
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers});

    return this.http.post(this.urlApi + '/add.json?token=' + this.token, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public edit(empresa: any): Observable<any> {
    console.log(empresa);
    const body = 'nomeEmpresa=' + empresa.nomeEmpresa +
      '&codEmpresa=' + empresa.codEmpresa + '&prop=' + empresa.prop +
      '&senha=' + empresa.senha + '&id=' + empresa.id;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers});

    return this.http.post(this.urlApi + '/edit.json?token=' + this.token, body, options)
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
