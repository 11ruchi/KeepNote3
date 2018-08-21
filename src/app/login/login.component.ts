import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public username;
  public password;
  public submitMessage: string;
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  @ViewChild(FormGroupDirective)
  formGroupDirective: FormGroupDirective;

  constructor(private authService: AuthenticationService,
    private routerService: RouterService) {

  }


  loginSubmit() {
    console.log(this.loginForm.value);
    this.authService.authenticateUser(this.loginForm.value).subscribe(response => {
      console.log('response', response);
      this.authService.setBearerToken(response['token']);
      this.routerService.routeToDashboard();
    },
      error => {
        if (error.status === 403) {
          this.submitMessage = error.error.message;
        } else {
          this.submitMessage = error.message;
        }

        console.log('err', error);
      });
    this.loginForm.reset();
    this.formGroupDirective.resetForm();

  }
}
