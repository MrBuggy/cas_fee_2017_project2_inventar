import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { InventoryService } from '../../../services/inventory.service';
import { InventoryList } from '../../../models/inventory-list';
import { StateList } from '../../../models/state';
import { ToastrService } from 'ngx-toastr';

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
  inventoryEditForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private _inventoryService: InventoryService,
    private location: Location,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.inventoryEditForm = new FormGroup({
      listName: new FormControl('', Validators.required)
    });

    this.route.params.subscribe(params => this.listID = params['id']);
    this.loadList();
  }

  save() {
    this._inventoryService.updateSingleInventoryList(this.listID, this.list.name).then(() => {
      this.toastr.success('Liste erfolgreich aktualisiert!');
    }, (err) => {
      this.toastr.error('Die Liste konnte nicht gespeichert werden.');
    });
    this.stateList.routerLink = `/inventory-list/${this.listID}`;
    this.goBack();
  }

  delete() {
    this._inventoryService.deleteSingleInventoryList(this.listID).then(() => {
      this.toastr.success('Liste erfolgreich gelöscht!');
    }, (err) => {
      this.toastr.error('Die Liste konnte nicht gelöscht werden.');
    });
    this.router.navigate([`/inventory`]);
  }

  cancel() {
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

  loadList() {
    this._inventoryService.loadSingleInventoryList(this.listID).subscribe(list => {
      this.list = list;
    });
  }
}
