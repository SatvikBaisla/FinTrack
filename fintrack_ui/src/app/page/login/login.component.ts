import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ILoginRequestBody } from '../../common/interface/common';
import { AuthService } from '../../common/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  isLoginDisabled: boolean = true;
  emailErrorMessage: string = '';
  passwordErrorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  checkLoginForm() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    // check for email
    if (email == '' || email == undefined || email == null) {
      this.isLoginDisabled = true;
      this.emailErrorMessage = 'Email Required'
    }
    else {
      this.isLoginDisabled = false;
      this.emailErrorMessage = ''
    }

    // check password
    if (password == '' || password == undefined || password == null) {
      this.isLoginDisabled = true;
      this.passwordErrorMessage = 'Password Required'
    }
    else {
      this.isLoginDisabled = false;
      this.passwordErrorMessage = ''
    }
  }

  login() {
    // temp navigation to home
    this.router.navigate(['/home']);
    return;
    
    const reqBody: ILoginRequestBody = this.loginForm.value;
    this.authService.userLogin(reqBody).subscribe(response => {
      // if the api success -> false
      if (!response.success) {
        switch (response.message) {
          case 'invalid email address':
            this.emailErrorMessage = 'Please enter a valid email';
            break;
          case 'no user found':
            this.emailErrorMessage = 'No user with this email';
            break;
          case 'wrong password':
            this.passwordErrorMessage = 'Incorrect password';
            break;
          default:
            alert('Login Error: ' + response.message);
        }
      }

      // if the api success -> true
      console.log('user login successfull');
    })
  }
}
