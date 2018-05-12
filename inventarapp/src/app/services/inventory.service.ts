import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { InventoryList } from '../models/inventory-list';
import { InventoryListItem } from '../models/inventory-list-item';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { QueryFn } from 'angularfire2/database/interfaces';

@Injectable()
export class InventoryService {
  private apiPath = '/inventoryList';

  inventoryListsRef: AngularFireList<InventoryList>;

  constructor(private db: AngularFireDatabase) {
    this.inventoryListsRef = db.list(this.apiPath);
  }

  loadInventoryList(): Observable<InventoryList[]> {
    return this.inventoryListsRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => Object.assign(snap.payload.val(), { $key: snap.key }));
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
  }

  deleteInventoryItem(key: string, listID: string) {
    const path = `${this.apiPath}/${listID}/items/${key}`;

    this.db.object(path).remove();
  }

  addInventoryList(listName: string) {
    const list = new InventoryList();
    list.name = listName;
    list.hasWarning = false;
    list.items = new Array<InventoryListItem>();

    this.inventoryListsRef.push(list);
  }
}
