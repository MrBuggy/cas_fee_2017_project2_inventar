import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { StateList } from '../../../models/state';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../models/user';
import * as firebase from 'firebase/app';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent {
  stateList: StateList = {
    state: 'save',
    routerLink: '/profile'
  };
  authState: firebase.User;
  displayName: string;

  constructor(
    private location: Location,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.authService.loadCurrentUserProfile()
      .subscribe(authState => {
        this.authState = authState;
        this.displayName = authState.displayName;
      });
  }

  save() {
    this.authState
      .updateProfile({
        displayName: this.displayName,
        photoURL: this.authState.photoURL
      })
      .then(
        () => {
          this.toastr.success('User-Profil erfolgreich aktualisiert.');
        },
        err => {
          this.toastr.error('User-Profil konnte nicht aktualisiert werden!');
        }
      );
  }

  cancel() {
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
