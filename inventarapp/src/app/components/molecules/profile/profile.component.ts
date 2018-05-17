import { Component, OnInit } from '@angular/core';
import { StateList } from '../../../models/state';
import * as firebase from 'firebase/app';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  authState: firebase.User;
  componentName = 'Profil';
  stateList: StateList = {
    state: 'edit',
    routerLink: '/profile-edit'
  };

  constructor(private authService: AuthService) {
    this.authService.loadCurrentUserProfile()
      .subscribe(authState => {
        this.authState = authState;
      });
  }
}
