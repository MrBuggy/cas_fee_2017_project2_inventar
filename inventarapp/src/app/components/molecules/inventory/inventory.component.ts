import { Component } from '@angular/core';
import { InventoryService } from '../../../services/inventory.service';
import { InventoryList } from '../../../models/inventory-list';

@Component({
  selector: 'inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {
  componentName: string = 'Listen';
  inventoryList: InventoryList[];
  routerLink: string = '/inventory-items';
  stateList: Object = {
    state: 'add',
    routerLink: '/inventory-list-add'
  };

  constructor(private _inventoryService: InventoryService) {
    this.loadInventoryList();
  }

  loadInventoryList() {
    this._inventoryService.loadInventoryList().snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(inventoryList => {
      this.inventoryList = inventoryList;
    });
  }
}
