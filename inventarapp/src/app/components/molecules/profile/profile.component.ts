import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from "../../../services/user.service";
import { User } from "../../../models/user";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  componentName: string = 'Profil';
  userList: User[];
  stateList = {
    state: 'edit',
    routerLink: ''
  };

  constructor(
    private route: ActivatedRoute,
    private _userService: UserService,
    private location: Location
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser(): void {
    this._userService.getUser().subscribe(userList => this.userList = userList);
  }

}
