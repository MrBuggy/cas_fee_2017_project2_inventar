import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { InventoryService } from "../../../services/inventory.service";
import { InventoryList } from "../../../models/inventory-list";
import { StateList } from "../../../models/state";
import { ToastrService } from "ngx-toastr";
import { AngularFireAuth } from "angularfire2/auth";
import { User } from "../../../models/user";
import { FirebaseAuth } from "@firebase/auth-types";
import { Observable } from "rxjs/Observable";
import * as firebase from "firebase/app";
import { take } from "rxjs/operators/take";

@Component({
  selector: "profile-edit",
  templateUrl: "./profile-edit.component.html",
  styleUrls: ["./profile-edit.component.scss"]
})
export class ProfileEditComponent implements OnInit {
  stateList: StateList = {
    state: "save",
    routerLink: ""
  };
  private authState: firebase.User;
  private displayName: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private toastr: ToastrService,
    private fireAuth: AngularFireAuth
  ) {
    this.fireAuth.authState.pipe(take(1)).subscribe(auth => {
      this.authState = auth;
      this.displayName = auth.displayName;
    });
  }

  ngOnInit() {}

  save() {
    this.authState
      .updateProfile({
        displayName: this.displayName,
        photoURL: this.authState.photoURL
      })
      .then(
        () => {
          this.toastr.success("User-Profil erfolgreich aktualisiert.");
        },
        err => {
          this.toastr.error("User-Profil konnte nicht aktualisiert werden!");
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
