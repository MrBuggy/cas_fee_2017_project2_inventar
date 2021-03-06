import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    value: 0,
    hasWarning: false
  };
  stateList: StateList = {
    state: 'save',
    routerLink: ''
  };
  listID: string;
  inventoryItemAddForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private _inventoryService: InventoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.inventoryItemAddForm = new FormGroup({
      itemName: new FormControl('', Validators.required),
      itemCount: new FormControl('', [Validators.min(1), Validators.required]),
      itemValue: new FormControl('', [Validators.min(0), Validators.required])
    });

    this.route.params.subscribe(params => this.listID = params['listID']);
  }

  save() {
    this._inventoryService.addInventoryItem(this.item, this.listID);
    this.goBack();
  }

  cancel() {
    this.goBack();
  }

  goBack(): void {
    this.stateList.routerLink = `/inventory-items/${this.listID}`;
    this.router.navigate([this.stateList.routerLink]);
  }
}
