import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { StateList } from "../../../models/state";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { take } from "rxjs/operators/take";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  private authState: firebase.User;
  componentName = "Profil";
  email: string;
  displayName: string;
  stateList: StateList = {
    state: "edit",
    routerLink: "/profile-edit"
  };

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private fireAuth: AngularFireAuth,
    private authService: AuthService
  ) {
    this.authService.loadCurrentUserProfile()
    .subscribe(authState => {
      this.authState = authState;
    });
  }

  ngOnInit() {}
}
