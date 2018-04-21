import { Component } from '@angular/core';
import { InventoryService } from '../../../services/inventory.service';
import { InventoryList } from '../../../models/inventory-list';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {
  componentName = 'Listen';
  inventoryList: Observable<InventoryList[]>;
  routerLink = '/inventory-items';
  stateList: Object = {
    state: 'add',
    routerLink: '/inventory-list-add'
  };

  constructor(private _inventoryService: InventoryService) {
   this.inventoryList = this._inventoryService.loadInventoryList();
  }
}
