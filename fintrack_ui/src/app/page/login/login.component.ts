import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { ILoginRequestBody } from '../../common/interface/common';

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

  constructor() { }

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
    const reqBody: ILoginRequestBody = this.loginForm.value;
  }
}
