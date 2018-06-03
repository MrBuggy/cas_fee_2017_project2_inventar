import { Component } from '@angular/core';
import { InventoryService } from '../../../services/inventory.service';
import { InventoryList } from '../../../models/inventory-list';
import { Observable } from 'rxjs/Observable';
import { StateList } from '../../../models/state';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {
  componentName = 'Listen';
  inventoryList: Observable<InventoryList[]>;
  routerLink = '/inventory-items';
  stateList: StateList = {
    state: 'add',
    routerLink: '/list-add'
  };

  constructor(private _inventoryService: InventoryService, private toastr: ToastrService) {
    this._inventoryService.loadInventoryList().then(list => {
      this.inventoryList = list;
    }, err => {
      toastr.error('Die Liste konnte nicht geladen werden!');
    });
  }
}
