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
    // route.queryParams.subscribe((data) => {
    //   if (data && data['refresh']) {
    //     this.logged = true;
    //   }
    // });
  }

  ngOnInit () {
    // this.logged = this.auth.loggedIn();
  }

  sair() {
    this.router.navigate(['/login']);
    // this.logged = false;
    this.auth.logout();
  }
}
