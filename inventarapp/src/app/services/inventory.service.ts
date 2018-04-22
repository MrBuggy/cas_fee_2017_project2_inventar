import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { InventoryList } from '../models/inventory-list';
import { InventoryListItem } from '../models/inventory-list-item';
import { INVENTORY_LIST_ITEMS } from '../models/inventory-list-items';

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

  // TODO rewrite with firebase
  addInventoryItem(item: any, listID: string) {
    // DO MUSCH DE SAVE UF FIREBASE MACHE -> SGANZE ITEM HESH + LISTE ID
    of(INVENTORY_LIST_ITEMS.push(item));
  }

  deleteInventoryItem(item: any) {
    of(INVENTORY_LIST_ITEMS.splice(-1));
  }
}
