import { Component, OnInit } from '@angular/core';
import { InventoryService } from "../../../services/inventory.service";
import { InventoryListModel } from "../../../models/inventory-list";

@Component({
  selector: 'inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  inventoryList: InventoryListModel[];

  constructor(private _inventoryService: InventoryService) {
    this.loadInventoryList();
  }

  ngOnInit() {
  }

  loadInventoryList() {
    this._inventoryService.loadInventoryList().subscribe((inventoryList: InventoryListModel[]) => this.inventoryList = inventoryList);
  }
}
