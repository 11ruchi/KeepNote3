import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { Register } from '../register';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  submitMessage: any;
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(private authService: AuthenticationService, private routerService: RouterService) {}

  loginSubmit() {
    const loginData = new Register(this.username.value, this.password.value);
    if (this.username.valid && this.password.valid) {
      this.authService.authenticateUser(loginData).subscribe(
        response => {
          // Set the token in localstorage
          this.authService.setBearerToken(response['token']);
          this.routerService.routeToDashboard();
        },
        err => {
          // get the error message based on the status
          this.submitMessage = (err.status === 403) ? err.error.message : err.message ;
        }
      );
    }
  }
  getUserNameErrorMessage() {
    // Required error message for username
    return this.username.hasError('required') ? 'You must enter a Username' : '';
  }
  getPasswordErrorMessage() {
    // Required error message for password
    return this.password.hasError('required') ? 'You must enter a password' : '';
  }
}
