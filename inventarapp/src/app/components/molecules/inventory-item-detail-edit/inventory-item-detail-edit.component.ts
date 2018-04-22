import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { InventoryService } from "../../../services/inventory.service";
import { InventoryListItem } from "../../../models/inventory-list-item";

@Component({
  selector: 'inventory-item-detail-edit',
  templateUrl: './inventory-item-detail-edit.component.html',
  styleUrls: ['./inventory-item-detail-edit.component.scss']
})
export class InventoryItemDetailEditComponent implements OnInit {
  item: InventoryListItem;
  id: string;
  listID: string;

  stateList = {
    state: 'save',
    routerLink: ''
  };

  constructor(
    private route: ActivatedRoute,
    private _inventoryService: InventoryService,
    private location: Location
  ) {
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
  }

  save() {
    this._inventoryService.editInventoryItem(this.item, this.id, this.listID);
    this.stateList.routerLink = `/inventory-items/${this.id}/${this.listID}`;
    this.goBack();
  }

  delete() {
    this._inventoryService.deleteInventoryItem(this.id, this.listID);
    this.stateList.routerLink = `/inventory-items/${this.listID}`;
    this.goBack();
  }

  cancel() {
    console.log('item edit cancel');
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
