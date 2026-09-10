import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../common/service/auth.service';
import { Router } from '@angular/router';
import { IRegisterRequestBody } from '../../common/interface/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });
  isRegisterDisabled: boolean = true;
  emailErrorMessage: string = '';
  passwordErrorMessage: string = '';
  nameErrorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  checkRegisterForm() {
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const name = this.registerForm.value.name;
    // check for email
    if (email == '' || email == undefined || email == null) {
      this.isRegisterDisabled = true;
      this.emailErrorMessage = 'Email Required'
    }
    else {
      this.isRegisterDisabled = false;
      this.emailErrorMessage = ''
    }

    // check password
    if (password == '' || password == undefined || password == null) {
      this.isRegisterDisabled = true;
      this.passwordErrorMessage = 'Password Required'
    }
    else {
      this.isRegisterDisabled = false;
      this.passwordErrorMessage = ''
    }

    // check name
    if (name == '' || name == undefined || name == null) {
      this.isRegisterDisabled = true;
      this.nameErrorMessage = 'Name Required'
    }
    else {
      this.isRegisterDisabled = false;
      this.nameErrorMessage = ''
    }
  }

  registerUser() {
    const reqBody: IRegisterRequestBody = this.registerForm.value;
    this.authService.userRegister(reqBody).subscribe({
      next: response => {
        console.log('User register successful');
        console.log(response.data);
        this.router.navigate(['/']);
      },

      error: error => {
        console.log(error);

        switch (error.error.message) {
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
            alert('Login Error: ' + error.error.message);
        }
      }
    });
  }
}
