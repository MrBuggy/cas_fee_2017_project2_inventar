import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  toggleWrapper = false;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      loginEmail: new FormControl('', [Validators.required, Validators.email]),
      loginPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    this.registerForm = new FormGroup({
      registerEmail: new FormControl('', [Validators.required, Validators.email]),
      registerPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  loginWithMail() {
    this.authService.loginWithMail(this.loginForm.value.loginEmail, this.loginForm.value.loginPassword)
      .then(() => {
        this.router.navigate(['/profile']);
      });
  }

  signUp() {
    this.authService.registerUser(this.registerForm.value.registerEmail, this.registerForm.value.registerPassword);
  }
}
