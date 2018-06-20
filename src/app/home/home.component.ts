import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import * as MicrosoftGraph from "@microsoft/microsoft-graph-types"
import { HomeService } from './home.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  template: `
  <div class="ms-Grid-row">
  <div class="ms-NavBar">

      <button (click)="onLogout()">Disconnect</button>
  </div>

    <div class="ms-Grid-col ms-u-mdPush1 ms-u-md9 ms-u-lgPush1 ms-u-lg6">
    <div>
      <h2 *ngIf="me" class="ms-font-xxl ms-fontWeight-semibold">Hi, {{ me.displayName }}!</h2>
      <button (click)="getData()"> get </button>



    </div>
  </div>
</div>
  `
})
export class HomeComponent implements OnInit, OnDestroy {
  me: MicrosoftGraph.User;
  users: MicrosoftGraph.User;
  subsGetUsers: Subscription;
  subsGetMe: Subscription;

  constructor(
    private homeService: HomeService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.subsGetMe = this.homeService.getMe().subscribe(me => this.me = me);
    this.subsGetUsers = this.homeService.getUsers().subscribe(users => this.users = users);
      console.log(this.users)
  }

  ngOnDestroy() {
    this.subsGetMe.unsubscribe();
    this.subsGetUsers.unsubscribe();
  }

  getData() {
    console.log(this.users)
    console.log(this.me)

  }

  onLogout() {
    this.authService.logout();
  }

  onLogin() {
    this.authService.login();
  }
}
