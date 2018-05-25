import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { NavigationItem } from '../models/navgationItem';
import { NAVIGATION } from '../models/mock-navigation';

@Injectable()
export class NavigationService {
  constructor() {}

  loadNavigationList(): Observable<NavigationItem[]> {
    return of(NAVIGATION);
  }
}
