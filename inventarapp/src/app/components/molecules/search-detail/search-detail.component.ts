import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { InventoryListItem } from '../../../models/inventory-list-item';
import { InventoryService } from '../../../services/inventory.service';
import { StateList } from '../../../models/state';

@Component({
  selector: 'search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.scss']
})
export class SearchDetailComponent implements OnInit {
  item: InventoryListItem;
  id: string;
  listID: string;
  stateList: StateList = {
    state: 'like',
    routerLink: ''
  };

  constructor(
    private route: ActivatedRoute,
    private _inventoryService: InventoryService,
    private location: Location
  ) {
    // Init item
    this.item = new InventoryListItem();
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.id = params['id']);
    this.route.params.subscribe(params => this.listID = params['listID']);

    this._inventoryService.loadInventoryListItem(this.id, this.listID)
      .subscribe(result => this.item = result);
  }

  likeItem() {
    this._inventoryService.rateItem(this.id, this.listID);

    // Todo: navigation
    this.stateList.routerLink = `/search-details/${this.id}/${this.listID}`;
  }

  goBack(): void {
    this.location.back();
  }
}
