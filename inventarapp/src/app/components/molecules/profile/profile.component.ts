import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StateList } from '../../../models/state';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  componentName = 'Profil';
  username: string;
  stateList: StateList = {
    state: 'edit',
    routerLink: ''
  };

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser(): void {
    this.authService.getCurrentUser().then((user) => {
      this.username = user.displayName || user.email;
    }, (err) => {
      console.log(err);
    });
  }
}
