import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateList } from '../../../models/state';
import * as firebase from 'firebase/app';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnDestroy {
  authState: firebase.User;
  componentName = 'Profil';
  userProfileSubscription: Subscription;
  stateList: StateList = {
    state: 'edit',
    routerLink: '/profile-edit'
  };

  constructor(private authService: AuthService) {
    this.userProfileSubscription = this.authService.loadCurrentUserProfile()
      .subscribe(authState => {
        this.authState = authState;
      });
  }

  ngOnDestroy() {
    this.userProfileSubscription.unsubscribe();
  }
}
