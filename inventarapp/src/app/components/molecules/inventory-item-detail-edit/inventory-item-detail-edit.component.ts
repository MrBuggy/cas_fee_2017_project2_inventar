import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { InventoryService } from '../../../services/inventory.service';
import { InventoryListItem } from '../../../models/inventory-list-item';
import { StateList } from '../../../models/state';

@Component({
  selector: 'inventory-item-detail-edit',
  templateUrl: './inventory-item-detail-edit.component.html',
  styleUrls: ['./inventory-item-detail-edit.component.scss']
})
export class InventoryItemDetailEditComponent implements OnInit {
  item: InventoryListItem;
  id: string;
  listID: string;
  inventoryItemEditForm: FormGroup;

  stateList: StateList = {
    state: 'save',
    routerLink: ''
  };

  constructor(
    private route: ActivatedRoute,
    private _inventoryService: InventoryService,
    private location: Location,
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
    this._inventoryService.loadInventoryListItem(this.id, this.listID)
      .subscribe(data => this.item = data);
  }

  save() {
    this._inventoryService.editInventoryItem(this.item, this.id, this.listID);
    this.stateList.routerLink = `/inventory-items/${this.id}/${this.listID}`;
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
    this.location.back();
  }
}
