import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { AuthGuard } from './services/auth-guard.service';


import { LoginComponent } from './pages/login/login.component';
// import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { UsuarioService } from './services/usuario.service';
import { AuthService } from './services/auth.service';
import { PageNotFoundComponent } from './pages/errors/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AdminModule,
    AppRoutingModule
  ],
  providers: [UsuarioService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {

  // private static url = 'http://54.233.175.231/v1/api_gestor';
  private static url = 'http://localhost:8080/api-gestor';
  private static token = 'fb65412704d49d604e97bfdb770f6d8423918bf0039bd3579d8dd5b46c57e85c';
  public logged = false;

  public static getUrl(): string {
    return this.url;
  }

  public static getToken(): string {
    return this.token;
  }

}
