import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppModule } from '../app.module';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AuthService} from './auth.service';

@Injectable()
export class UsuarioEmpresaService {
  private urlApi = AppModule.getUrl() + '/usuarioempresa';
  private  token = AppModule.getToken();
  public empresas = [{}];

  constructor(private http: Http, private auth: AuthService) {
      this.getEmpresas().subscribe(
        (retorno) => {
          if (retorno) {
            retorno = retorno.usuarioEmpresas;
            let i = 1;
            for (const a of retorno) {
              this.empresas.push({ item_id: i, item_text: a.nome });
              i++;
            }
            // console.log(this.empresas);
          }
        });
  }

  getEmpresas(): Observable<any> {
    return this.http.get(this.urlApi + '/getEmpresas.json?token=' + this.auth.getToken())
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
