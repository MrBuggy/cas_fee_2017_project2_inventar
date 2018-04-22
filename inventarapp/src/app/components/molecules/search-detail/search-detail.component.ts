import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { InventoryListItem } from '../../../models/inventory-list-item';
import { InventoryService } from '../../../services/inventory.service';

@Component({
  selector: 'search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.scss']
})
export class SearchDetailComponent implements OnInit {
  item: InventoryListItem;
  id: string;
  listID: string;
  stateList = {
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
  }

  likeItem() {
    console.log('LIKE THIS ONE!');
  }

  goBack(): void {
    this.location.back();
  }

}
