import { Injectable } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../models/user';
import { of } from 'rxjs/observable/of';
import { take } from 'rxjs/operators/take';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthService {
  public user: Observable<User>;

  constructor(private fireAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router,  private toastr: ToastrService) {
    this.user = this.fireAuth.authState
      .switchMap((auth) => {
        if (auth) {
          return this.db.object(`users/${auth.uid}`).valueChanges();
        } else {
          return of(null);
        }
      });
  }

  loginWithMail(email: string, password: string) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password).then(
      user => {
        this.updateNewUser(user);
      }, (err) => {
        this.toastr.error('Login fehlgeschlagen', 'Benutzername oder Passwort sind falsch!');
        throw err;
      }
    );
  }

  registerUser(email: string, password: string) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.updateNewUser(user);
        this.router.navigate(['/profile']);
      }, (err) => {
        this.toastr.error(err);
      });
  }

  updateNewUser(authData) {
    const userData = new User(authData);
    const ref = this.db.object(`users/${userData.uid}`);
    ref.valueChanges().pipe(take(1)).subscribe((user) => {
      if (!user) {
        ref.update(userData);
      }
    });
  }

  updateCurrentUser(userData) {
    const currentUser = this.fireAuth.auth.currentUser;
    const ref = this.db.object(`users/${currentUser.uid}`);
    ref.valueChanges().pipe(take(1)).subscribe((user) => {
      ref.update(userData);
    });
  }

  logoutUser() {
    this.fireAuth.auth.signOut();
    console.log('User logged out');
    this.router.navigate(['/login']);
  }

  getCurrentUser() {
    return new Promise<firebase.User>((resolve, reject) => {
      const authorizedUser = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }
}
