import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { InventoryService } from '../../../services/inventory.service';
import { InventoryList } from '../../../models/inventory-list';
import { StateList } from '../../../models/state';

@Component({
  selector: 'inventory-edit',
  templateUrl: './inventory-edit.component.html',
  styleUrls: ['./inventory-edit.component.scss']
})
export class InventoryEditComponent implements OnInit {
  stateList: StateList = {
    state: 'save',
    routerLink: ''
  };
  listID: string;
  list: InventoryList;

  constructor(
    private route: ActivatedRoute,
    private _inventoryService: InventoryService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.listID = params['id']);
    console.log(this.listID);

    this.loadList();
  }

  save() {
    console.log('SAVE!');
    // this.goBack();
  }

  delete() {
    console.log('DELETE!');
  }

  cancel() {
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

  loadList(): void {
    this._inventoryService.loadSingleInventoryList(this.listID).subscribe(list => {
      this.list = list.payload.val();
    });
  }
}
