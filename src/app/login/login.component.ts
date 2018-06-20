import { Component } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  template: `
  <div>
    <div>
    <button (click)="onLogin()">
      <span >Connect</span>
    </button>
    </div>
</div>
  `
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.login();
  }
}
