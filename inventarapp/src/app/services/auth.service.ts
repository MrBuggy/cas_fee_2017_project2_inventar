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
import { SearchService } from './search.service';

@Injectable()
export class AuthService {
  public user: Observable<User>;
  public authState: firebase.User;
  public isLoggedIn;

  constructor(
    private fireAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    private toastr: ToastrService,
    private searchService: SearchService
  ) {
    this.user = this.fireAuth.authState.switchMap(auth => {
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
        this.db.database.goOnline();
        this.isLoggedIn = true;
      },
      err => {
        this.toastr.error(
          'Login fehlgeschlagen',
          'Benutzername oder Passwort sind falsch!'
        );
        throw err;
      }
    );
  }

  loadCurrentUserProfile(): Observable<firebase.User> {
    return this.fireAuth.authState.pipe(take(1)).map(user => {
      return user;
    });
  }

  registerUser(email: string, password: string) {
    return this.fireAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(
        user => {
          this.updateNewUser(user);
          this.db.database.goOnline();
          this.router.navigate(['/profile']);
          this.isLoggedIn = true;
        },
        err => {
          this.toastr.error(err);
        }
      );
  }

  updateNewUser(authData) {
    const userData = new User(authData);
    const ref = this.db.object(`users/${userData.uid}`);
    ref
      .valueChanges()
      .pipe(take(1))
      .subscribe(user => {
        if (!user) {
          ref.update(userData);
        }
      });
  }

  updateCurrentUser(userData) {
    const currentUser = this.fireAuth.auth.currentUser;
    const ref = this.db.object(`users/${currentUser.uid}`);
    ref
      .valueChanges()
      .pipe(take(1))
      .subscribe(user => {
        ref.update(userData);
      });
  }

  logoutUser() {
    this.db.database.goOffline();
    this.fireAuth.auth.signOut().then(
      () => {
        this.router.navigate(['/login']);
        this.isLoggedIn = false;
        this.searchService.searchTerm = undefined;
      },
      err => {
        this.toastr.error('Der User konnte nicht abgemeldet werden!');
      }
    );
  }

  getCurrentUser() {
    return new Promise<firebase.User>((resolve, reject) => {
      const authorizedUser = firebase.auth().onAuthStateChanged(user => {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }
}
