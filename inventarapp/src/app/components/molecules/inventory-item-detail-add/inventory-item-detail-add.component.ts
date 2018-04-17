import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { InventoryService } from "../../../services/inventory.service";
import { InventoryListItem } from "../../../models/inventory-list-item";

@Component({
  selector: 'inventory-item-detail-add',
  templateUrl: './inventory-item-detail-add.component.html',
  styleUrls: ['./inventory-item-detail-add.component.scss']
})
export class InventoryItemDetailAddComponent implements OnInit {
  // item: InventoryListItem;
  item: any = {
    id: -1,
    name: '',
    count: 0,
    hasWarning: false
  };
  stateList = {
    state: 'save',
    routerLink: '/inventory-items'
  };

  constructor(
    private route: ActivatedRoute,
    private _inventoryService: InventoryService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  save() {
    console.log('save');
    this._inventoryService.addInventoryItem(this.item);
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
