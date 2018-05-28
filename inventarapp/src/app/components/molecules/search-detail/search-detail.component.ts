import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { InventoryListItem } from '../../../models/inventory-list-item';
import { InventoryService } from '../../../services/inventory.service';
import { StateList } from '../../../models/state';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.scss']
})
export class SearchDetailComponent implements OnInit {
  item: InventoryListItem;
  id: string;
  listID: string;
  hasLiked: boolean;
  stateList: StateList = {
    state: 'like',
    routerLink: ''
  };

  constructor(
    private route: ActivatedRoute,
    private _inventoryService: InventoryService,
    private location: Location,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.item = new InventoryListItem();
  }

  ngOnInit() {
    this.route.params.subscribe(params => (this.id = params['id']));
    this.route.params.subscribe(params => (this.listID = params['listID']));
    this.stateList.routerLink = `/search-detail/${this.id}/${this.listID}`;

    this._inventoryService
      .loadInventoryListItem(this.id, this.listID)
      .subscribe(result => {
        this.item = result;
        this.checkRating();
      });
  }

  likeItem() {
    this._inventoryService.rateItem(this.id, this.listID);
    this.toastr.success('Gefällt dir!');
  }

  goBack(): void {
    this.location.back();
  }

  checkRating() {
    this.authService.getCurrentUser().then(user => {
      if (this.item.userRated && this.item.userRated.includes(user.uid)) {
        this.hasLiked = true;
      } else {
        this.hasLiked = false;
      }
    });
  }
}
