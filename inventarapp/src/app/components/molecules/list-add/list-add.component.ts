import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { InventoryService } from '../../../services/inventory.service';

@Component({
  selector: 'list-add',
  templateUrl: './list-add.component.html',
  styleUrls: ['./list-add.component.scss']
})
export class ListAddComponent implements OnInit {
  stateList = {
    state: 'save',
    routerLink: '/inventory'
  };
  listName: string;

  constructor(
    private route: ActivatedRoute,
    private _inventoryService: InventoryService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  save() {
    // TODO: SAVE LIST
    console.log('save');
    this._inventoryService.addInventoryList(this.listName);
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
