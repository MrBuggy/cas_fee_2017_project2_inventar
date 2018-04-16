import { Component, OnInit } from '@angular/core';
import { InventoryService } from "../../../services/inventory.service";
import { InventoryListItem } from "../../../models/inventory-list-item";
import { INVENTORY_LIST_ITEMS } from "../../../models/inventory-list-items";
import { Location } from '@angular/common';

@Component({
  selector: 'inventory-items',
  templateUrl: './inventory-items.component.html',
  styleUrls: ['./inventory-items.component.scss']
})
export class InventoryItemsComponent implements OnInit {
  inventoryListItems: InventoryListItem[];
  routerLink: string;
  stateList: Object = {
    state: 'add',
    routerLink: '/inventory-item-detail-add'
  };

  constructor(
    private _inventoryService: InventoryService,
    private location: Location
  ) {
    this.loadInventoryItemsList();
  }

  ngOnInit() {
  }

  loadInventoryItemsList() {
    this._inventoryService.loadInventoryListItems().subscribe(inventoryListItems => this.inventoryListItems = inventoryListItems);
  }

  goBack(): void {
    this.location.back();
  }
}
