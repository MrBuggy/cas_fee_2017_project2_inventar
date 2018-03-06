import { Component, OnInit } from '@angular/core';
import { InventoryService } from "../../../services/inventory.service";
import { InventoryItemsListModel } from "../../../models/inventory-list-items";

@Component({
  selector: 'inventory-items',
  templateUrl: './inventory-items.component.html',
  styleUrls: ['./inventory-items.component.scss']
})
export class InventoryItemsComponent implements OnInit {
  inventoryItemsList: InventoryItemsListModel[];

  constructor(private _inventoryService: InventoryService) {
    this.loadInventoryItemsList();
  }

  ngOnInit() {
  }

  loadInventoryItemsList() {
    this._inventoryService.loadInventoryItemsList().subscribe((inventoryItemsList: InventoryItemsListModel[]) => this.inventoryItemsList = inventoryItemsList);
  }
}
