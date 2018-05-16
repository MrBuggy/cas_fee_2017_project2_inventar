import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { InventoryList } from '../models/inventory-list';
import { InventoryListItem } from '../models/inventory-list-item';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { QueryFn } from 'angularfire2/database/interfaces';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';

@Injectable()
export class InventoryService {
  private apiPath = '/inventoryList';

  inventoryListsRef: AngularFireList<InventoryList>;

  constructor(private db: AngularFireDatabase, private toastr: ToastrService, private authService: AuthService) {
    this.inventoryListsRef = db.list(this.apiPath);
  }

  loadInventoryList(): Promise<Observable<InventoryList[]>> {
    return this.authService.getCurrentUser().then((user) => {
      return this.db.list(this.apiPath, ref => ref.orderByChild('userID').equalTo(user.uid)).snapshotChanges().map((arr) => {
        return arr.map((snap) => Object.assign(snap.payload.val(), { $key: snap.key }));
      });
    });
  }

  addList(list: InventoryList): void {
    this.inventoryListsRef.push(list);
  }

  loadInventoryListItems(key: string): Observable<InventoryListItem[]> {
    const path = `${this.apiPath}/${key}/items`;

    return this.db.list(path).snapshotChanges().map((arr) => {
      return arr.map((snap) =>
        Object.assign(snap.payload.val(), { $key: snap.key })
      );
    });
  }

  loadInventoryListItem(key: string, listID: string): Observable<InventoryListItem> {
    const path = `${this.apiPath}/${listID}/items/${key}`;

    return this.db.object(path).valueChanges() as Observable<InventoryListItem>;
  }

  addInventoryItem(item: any, listID: string) {
    const path = `${this.apiPath}/${listID}/items`;

    this.db.list(path).push({
      name: item.name,
      count: item.count,
      value: item.value,
      hasWarning: false,
      lending: {}
    });

    this.toastr.success('Element erfolgreich hinzugefügt!');
  }

  editInventoryItem(item: any, key: string, listID: string) {
    const path = `${this.apiPath}/${listID}/items/${key}`;

    this.db.object(path).update({
      name: item.name,
      count: item.count,
      hasWarning: item.hasWarning || false,
      value: item.value,
      lending: item.lending || {}
    });

    this.toastr.success('Element erfolgreich gespeichert!');
  }

  deleteInventoryItem(key: string, listID: string) {
    const path = `${this.apiPath}/${listID}/items/${key}`;

    this.db.object(path).remove();
    this.toastr.success('Element erfolgreich gelöscht!');
  }

  addInventoryList(listName: string) {
    this.authService.getCurrentUser().then((result) => {
      const list = new InventoryList();
      list.name = listName;
      list.hasWarning = false;
      list.userID = result.uid;
      list.items = new Array<InventoryListItem>();
      this.inventoryListsRef.push(list);
      this.toastr.success('Liste erfolgreich hinzugefügt!');
    });
  }

  loadSingleInventoryList(listID: string): Observable<InventoryList> {
    return this.db.object<InventoryList>(`${this.apiPath}/${listID}`).valueChanges();
  }

  updateSingleInventoryList(listID: string, newName: string) {
    return this.db.object<InventoryList>(`${this.apiPath}/${listID}`).update({ name: newName });
  }

  deleteSingleInventoryList(listID: string) {
    return this.db.object<InventoryList>(`${this.apiPath}/${listID}`).remove();
  }
}
