import { Component, OnInit, OnDestroy } from '@angular/core';
import { InventoryService } from '../../../services/inventory.service';
import { InventoryListItem } from '../../../models/inventory-list-item';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { StateList } from '../../../models/state';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'inventory-items',
  templateUrl: './inventory-items.component.html',
  styleUrls: ['./inventory-items.component.scss']
})
export class InventoryItemsComponent implements OnInit, OnDestroy {
  inventoryListItems: Observable<InventoryListItem[]>;
  routerLink: string;
  componentName = 'Listen Elemente';
  listID: string;
  listEditRoute: string;
  inventoryListItemsSubscription: Subscription;
  stateList: StateList = {
    state: 'add',
    routerLink: ''
  };

  constructor(
    private _inventoryService: InventoryService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.listID = params['id']);
    this.stateList.routerLink = `/inventory-item-detail-add/${this.listID}`;
    this.listEditRoute = `/inventory-edit/${this.listID}`;

    this.inventoryListItemsSubscription = this.route.params.subscribe(params => {
      this.inventoryListItems = this._inventoryService.loadInventoryListItems(params['id']);
    });
  }

  goBack(): void {
    this.location.back();
  }

  redirect() {
    this.router.navigate([`/inventory`]);
  }

  ngOnDestroy() {
    this.inventoryListItemsSubscription.unsubscribe();
  }
}
