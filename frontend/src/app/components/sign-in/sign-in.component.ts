import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { UserData } from '../../models/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  signinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signinForm.valid) {
      const { email, password } = this.signinForm.value;
      this.authService.signin(email, password).subscribe(
        (response: UserData) => {
          this.authService.setToken(response.token!);
          this.snackBar.open('Sign-in successful!', 'Close', {
            duration: 2000,
          });
          this.authService.signinSubject.next(true);
        },
        (error) => {
          console.log(error);
          this.snackBar.open('Email or Password is incorect', 'Close', {
            duration: 2000,
          });
        }
      );
    } else {
      this.snackBar.open('Please fill out the form correctly.', 'Close', {
        duration: 2000,
      });
    }
  }

  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }
}
