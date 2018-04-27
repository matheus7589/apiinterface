import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent {

  constructor(private auth: AuthService, private router: Router) { }


}
