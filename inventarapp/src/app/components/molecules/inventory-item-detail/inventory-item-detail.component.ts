import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { InventoryListItem } from '../../../models/inventory-list-item';
import { InventoryService } from '../../../services/inventory.service';
import { StateList } from '../../../models/state';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'inventory-item-detail',
  templateUrl: './inventory-item-detail.component.html',
  styleUrls: ['./inventory-item-detail.component.scss']
})
export class InventoryItemDetailComponent implements OnInit, OnDestroy {
  item: InventoryListItem;
  id: string;
  listID: string;
  stateList: StateList = {
    state: 'edit',
    routerLink: ''
  };
  inventoryListItemSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private _inventoryService: InventoryService,
    private location: Location
  ) {
    this.item = new InventoryListItem();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.id = params['id']);
    this.route.params.subscribe(params => this.listID = params['listID']);

    this.loadItem();
  }

  loadItem(): void {
    this.inventoryListItemSubscription = this._inventoryService.loadInventoryListItem(this.id, this.listID)
      .subscribe(data => this.item = data);

    this.stateList.routerLink = `/inventory-item-detail-edit/${this.id}/${this.listID}`;
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy() {
    this.inventoryListItemSubscription.unsubscribe();
  }
}
