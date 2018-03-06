import { Component, OnInit } from '@angular/core';
import { NavigationService } from "../../../services/navigation.service";
import { NavigationListModel } from "../../../models/navigation-list";

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  navigationList: NavigationListModel[];

  constructor(private _navService: NavigationService) {
    this.loadNavigationList();
  }

  ngOnInit() {
  }

  loadNavigationList() {
    this._navService.loadNavigationList().subscribe((navigationList: NavigationListModel[]) => this.navigationList = navigationList);
  }
}
