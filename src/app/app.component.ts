import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'api-interface';
  logged = false;

  constructor(private auth: AuthService, private router: Router, private location: Location, private route: ActivatedRoute) {
  }

  ngOnInit () {
    // this.logged = this.auth.loggedIn();
    // this.notif
  }

  sair() {
    this.auth.logout();
  }
}
