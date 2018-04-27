import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './admin.component.html'
})
export class AdminComponent {

  constructor(private auth: AuthService, private router: Router) { }

  sair() {
    console.log('saindo');
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
