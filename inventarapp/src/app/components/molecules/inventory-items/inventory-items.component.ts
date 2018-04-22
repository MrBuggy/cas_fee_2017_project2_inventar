import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../services/inventory.service';
import { InventoryListItem } from '../../../models/inventory-list-item';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'inventory-items',
  templateUrl: './inventory-items.component.html',
  styleUrls: ['./inventory-items.component.scss']
})
export class InventoryItemsComponent implements OnInit {
  inventoryListItems: Observable<InventoryListItem[]>;
  routerLink: string;
  listID: string;
  stateList: Object = {
    state: 'add',
    routerLink: '/inventory-item-detail-add'
  };

  constructor(
    private _inventoryService: InventoryService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.listID = params['id']);

    this.route.params.subscribe(params => {
      this.inventoryListItems = this._inventoryService.loadInventoryListItems(params['id']);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
