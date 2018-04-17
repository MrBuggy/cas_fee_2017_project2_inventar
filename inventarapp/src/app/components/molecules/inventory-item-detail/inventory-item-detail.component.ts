import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { InventoryListItem } from "../../../models/inventory-list-item";
import { InventoryService } from "../../../services/inventory.service";


@Component({
  selector: 'inventory-item-detail',
  templateUrl: './inventory-item-detail.component.html',
  styleUrls: ['./inventory-item-detail.component.scss']
})
export class InventoryItemDetailComponent implements OnInit {
  @Input() item: InventoryListItem;
  stateList = {
    state: 'edit',
    routerLink: ''
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
    const id = +this.route.snapshot.paramMap.get('id');
    this._inventoryService.loadInventoryItem(id)
      .subscribe(item => this.item = item);

    this.stateList.routerLink = "/inventory-item-detail-edit/" + id;
  }

  goBack(): void {
    this.location.back();
  }
}
