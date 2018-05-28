import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../../../services/inventory.service';
import { InventoryListItem } from '../../../models/inventory-list-item';
import { StateList } from '../../../models/state';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'inventory-item-detail-edit',
  templateUrl: './inventory-item-detail-edit.component.html',
  styleUrls: ['./inventory-item-detail-edit.component.scss']
})
export class InventoryItemDetailEditComponent implements OnInit, OnDestroy {
  item: InventoryListItem;
  id: string;
  listID: string;
  inventoryItemEditForm: FormGroup;
  inventoryItemEditSubscription: Subscription;
  stateList: StateList = {
    state: 'save',
    routerLink: ''
  };

  constructor(
    private route: ActivatedRoute,
    private _inventoryService: InventoryService,
    private router: Router
  ) {
    this.item = new InventoryListItem();
  }

  ngOnInit() {
    this.inventoryItemEditForm = new FormGroup({
      itemName: new FormControl('', Validators.required),
      itemCount: new FormControl('', [Validators.min(1), Validators.required]),
      itemValue: new FormControl('', [Validators.min(0), Validators.required])
    });

    this.route.params.subscribe(params => this.id = params['id']);
    this.route.params.subscribe(params => this.listID = params['listID']);

    this.loadItem();
  }

  loadItem(): void {
    this.inventoryItemEditSubscription = this._inventoryService.loadInventoryListItem(this.id, this.listID)
      .subscribe(data => this.item = data);
  }

  save() {
    this._inventoryService.editInventoryItem(this.item, this.id, this.listID);
    this.goBack();
  }

  delete() {
    this._inventoryService.deleteInventoryItem(this.id, this.listID);
    this.router.navigate([`/inventory-items/${this.listID}`]);
  }

  cancel() {
    this.goBack();
  }

  goBack(): void {
    this.stateList.routerLink = `/inventory-item-detail/${this.id}/${this.listID}`;
    this.router.navigate([this.stateList.routerLink]);
  }

  ngOnDestroy() {
    this.inventoryItemEditSubscription.unsubscribe();
  }
}
