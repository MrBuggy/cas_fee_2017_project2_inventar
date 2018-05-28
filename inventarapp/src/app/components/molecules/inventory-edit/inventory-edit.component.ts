import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../../../services/inventory.service';
import { InventoryList } from '../../../models/inventory-list';
import { StateList } from '../../../models/state';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'inventory-edit',
  templateUrl: './inventory-edit.component.html',
  styleUrls: ['./inventory-edit.component.scss']
})
export class InventoryEditComponent implements OnInit, OnDestroy {
  stateList: StateList = {
    state: 'save',
    routerLink: ''
  };
  listID: string;
  list: InventoryList;
  inventoryEditForm: FormGroup;
  inventoryListSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private _inventoryService: InventoryService,
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
    this.stateList.routerLink = `/inventory-items/${this.listID}`;
    this.router.navigate([this.stateList.routerLink]);
  }

  loadList() {
    this.inventoryListSubscription = this._inventoryService.loadSingleInventoryList(this.listID).subscribe(list => {
      this.list = list;
    });
  }

  ngOnDestroy() {
    this.inventoryListSubscription.unsubscribe();
  }
}
