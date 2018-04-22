import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { User } from '../models/user';
import { USER_OBJECT } from '../models/user-object';

@Injectable()
export class UserService {

  constructor() { }

  getUser(): Observable<User[]> {
    return of(USER_OBJECT);
  }

  getUserEdit(id: number): Observable<User> {
    return of(USER_OBJECT.find(item => item.id === id));
  }
}
