import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../services/inventory.service';
import { InventoryListItem } from '../../../models/inventory-list-item';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { StateList } from '../../../models/state';

@Component({
  selector: 'inventory-items',
  templateUrl: './inventory-items.component.html',
  styleUrls: ['./inventory-items.component.scss']
})
export class InventoryItemsComponent implements OnInit {
  inventoryListItems: Observable<InventoryListItem[]>;
  routerLink: string;
  componentName = 'Listen Elemente';
  listID: string;
  stateList: StateList = {
    state: 'add',
    routerLink: ''
  };

  constructor(
    private _inventoryService: InventoryService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.listID = params['id']);
    this.stateList.routerLink = `/inventory-item-detail-add/${this.listID}`;

    this.route.params.subscribe(params => {
      this.inventoryListItems = this._inventoryService.loadInventoryListItems(params['id']);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
