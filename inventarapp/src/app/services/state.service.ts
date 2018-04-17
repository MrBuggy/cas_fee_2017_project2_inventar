import { Injectable } from '@angular/core';
import { StateList } from '../models/state';

@Injectable()
export class StateService {
  stateList: StateList;

  constructor() { }

  getState(component: string) {
    if (component == 'inventory') {
      this.stateList.state = 'add';
      this.stateList.routerLink = '/inventory-list-add';
    }

    return this.stateList;
  }
}
