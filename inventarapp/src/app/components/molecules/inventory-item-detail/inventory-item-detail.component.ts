import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { InventoryListItem } from '../../../models/inventory-list-item';
import { InventoryService } from '../../../services/inventory.service';

@Component({
  selector: 'inventory-item-detail',
  templateUrl: './inventory-item-detail.component.html',
  styleUrls: ['./inventory-item-detail.component.scss']
})
export class InventoryItemDetailComponent implements OnInit {
  item: InventoryListItem;
  id: string;
  listID: string;
  stateList = {
    state: 'edit',
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

  ngOnInit(): void {
    this.route.params.subscribe(params => this.id = params['id']);
    this.route.params.subscribe(params => this.listID = params['listID']);

    this.loadItem();
  }

  loadItem(): void {
    this._inventoryService.loadInventoryListItem(this.id, this.listID)
      .subscribe(data => this.item = data);

    // TODO
    this.stateList.routerLink = `/inventory-item-detail-edit/${this.id}/${this.listID}`;
  }

  goBack(): void {
    this.location.back();
  }
}
