import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { InventoryService } from '../../../services/inventory.service';
import { InventoryListItem } from '../../../models/inventory-list-item';
import { StateList } from '../../../models/state';

@Component({
  selector: 'inventory-item-detail-add',
  templateUrl: './inventory-item-detail-add.component.html',
  styleUrls: ['./inventory-item-detail-add.component.scss']
})
export class InventoryItemDetailAddComponent implements OnInit {
  title = 'Hinzufügen';
  item: any = {
    id: -1,
    name: '',
    count: 0,
    hasWarning: false
  };
  stateList: StateList = {
    state: 'save',
    routerLink: ''
  };
  listID: string;

  constructor(
    private route: ActivatedRoute,
    private _inventoryService: InventoryService,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.listID = params['listID']);
  }

  save() {
    this._inventoryService.addInventoryItem(this.item, this.listID);
    this.stateList.routerLink = `/inventory-items/${this.listID}`;
    this.goBack();
  }

  cancel() {
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
