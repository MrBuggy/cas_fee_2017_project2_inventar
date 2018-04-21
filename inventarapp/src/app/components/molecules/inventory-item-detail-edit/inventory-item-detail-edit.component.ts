import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { InventoryService } from "../../../services/inventory.service";
import { InventoryListItem } from "../../../models/inventory-list-item";

@Component({
  selector: 'inventory-item-detail-edit',
  templateUrl: './inventory-item-detail-edit.component.html',
  styleUrls: ['./inventory-item-detail-edit.component.scss']
})
export class InventoryItemDetailEditComponent implements OnInit {
  @Input() item: InventoryListItem;
  stateList = {
    state: 'save',
    routerLink: '/inventory-items'
  };

  constructor(
    private route: ActivatedRoute,
    private _inventoryService: InventoryService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.loadItem();
  }

  loadItem(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this._inventoryService.loadInventoryListItem(id)
      .subscribe(item => this.item = item);
  }

  save() {
    console.log('save');
    this.goBack();
  }

  delete() {
    console.log('item should be deleted');
    this._inventoryService.deleteInventoryItem(this.item);
    this.goBack();
  }

  cancel() {
    console.log('item edit cancel');
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
