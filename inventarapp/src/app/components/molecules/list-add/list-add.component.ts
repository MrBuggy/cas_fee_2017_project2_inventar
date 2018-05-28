import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { InventoryService } from '../../../services/inventory.service';
import { StateList } from '../../../models/state';

@Component({
  selector: 'list-add',
  templateUrl: './list-add.component.html',
  styleUrls: ['./list-add.component.scss']
})
export class ListAddComponent implements OnInit {
  title = 'Hinzufügen';
  stateList: StateList = {
    state: 'save',
    routerLink: '/inventory'
  };
  listName: string;
  listAddForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private _inventoryService: InventoryService,
    private location: Location
  ) { }

  ngOnInit() {
    this.listAddForm = new FormGroup({
      listAddName: new FormControl('', Validators.required)
    });
  }

  save() {
    this._inventoryService.addInventoryList(this.listName);
    this.goBack();
  }

  cancel() {
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
