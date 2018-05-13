import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public afAuth: AngularFireAuth,
    public authService: AuthService,
    private router: Router) { }

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authService.getCurrentUser()
        .then(user => {
          this.router.navigate(['/profile']);
          return resolve(false);
        }, err => {
          console.log(err);
          return resolve(true);
        });
    });
  }
}
