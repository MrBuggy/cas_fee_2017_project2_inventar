import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() hasBack: boolean;
  @Input() hasCancel: boolean;
  @Input() hasEdit: boolean;
  @Input() listEditRoute: string;

  @Output() btnBack = new EventEmitter<undefined>();
  @Output() btnCancel = new EventEmitter<undefined>();
  @Output() btnEdit = new EventEmitter<undefined>();

  authState: firebase.User;
  displayName: string;
  email: string;

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadCurrentUser();
  }

  logout() {
    this.authService.logoutUser();
  }

  loadCurrentUser() {
    this.authService.loadCurrentUserProfile()
    .subscribe(authState => {
      this.authState = authState;
      this.displayName = authState.displayName;
      this.email = authState.email;
    });
  }
}
