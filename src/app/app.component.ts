import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public notificationSettings = {
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 50,
    animate: 'fromRight'
  };
  title = 'api-interface';
  public logged = false;


  constructor(private auth: AuthService, private router: Router, private location: Location, private route: ActivatedRoute,
              private notif: NotificationsService) {
  }

  public createNotify(title: any, content: any, type: any) {
    this.notif.create(title, content, type, this.notificationSettings);
  }

  ngOnInit () {
    // this.logged = this.auth.loggedIn();
    // this.notif
  }

  sair() {
    this.auth.logout();
  }
}
