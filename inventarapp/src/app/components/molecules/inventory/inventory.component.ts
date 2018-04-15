import { Component, OnInit } from '@angular/core';
import { InventoryService } from "../../../services/inventory.service";
import { InventoryList } from "../../../models/inventory-list";
import { INVENTORY_LIST } from "../../../models/inventory-lists";

@Component({
  selector: 'inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  componentName: string = 'Listen';
  inventoryList: InventoryList[];
  routerLink: string = "/inventory-items";
  stateList: Object = {
    state: 'add',
    routerLink: '/inventory-list-add'
  }

  constructor(
    private _inventoryService: InventoryService
  ) {
    this.loadInventoryList();
  }

  ngOnInit() {
  }

  loadInventoryList() {
    this._inventoryService.loadInventoryList().subscribe(inventoryList => this.inventoryList = inventoryList);
  }
}
