import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';

@Component({
  templateUrl: './empresas.component.html'
})
export class EmpresasComponent {

  constructor(private auth: AuthService, private router: Router) {
  }


}
