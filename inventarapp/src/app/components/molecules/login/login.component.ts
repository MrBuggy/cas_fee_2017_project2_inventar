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
  toggleWrapper: boolean = false;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      loginEmail: new FormControl('', [Validators.required, Validators.email]),
      loginPassword: new FormControl('', Validators.required)
    });

    // TODO register component
    this.registerForm = new FormGroup({
      registerEmail: new FormControl('', [Validators.required, Validators.email]),
      registerPassword: new FormControl('', Validators.required)
    });
  }

  loginWithMail() {
    this.authService.loginWithMail(this.loginForm.value.loginEmail, this.loginForm.value.loginPassword)
      .then(() => {
        this.router.navigate(['/profile']);
      }, (err) => {
      });
  }

  signUp() {
    this.authService.registerUser(this.registerForm.value.registerEmail, this.registerForm.value.registerPassword);
  }
}
