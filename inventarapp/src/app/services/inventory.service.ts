import { Injectable } from "@angular/core";

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { InventoryList } from "../models/inventory-list";
import { InventoryListItem } from "../models/inventory-list-item";
import { INVENTORY_LIST_ITEMS } from "../models/inventory-list-items";

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { QueryFn } from 'angularfire2/database/interfaces';

@Injectable()
export class InventoryService {
  private apiPath = '/inventoryList';

  inventoryListRef: AngularFireList<InventoryList> = null;

  constructor(private db: AngularFireDatabase) {
    this.inventoryListRef = db.list(this.apiPath);
  }

  loadInventoryList(): AngularFireList<InventoryList> {
    return this.inventoryListRef;
  }

  loadInventoryListItems(): Observable<InventoryListItem[]> {
    return of(INVENTORY_LIST_ITEMS);
  }

  loadInventoryItem(id: number): Observable<InventoryListItem> {
    return of(INVENTORY_LIST_ITEMS.find(item => item.id === id));
  }

  addInventoryItem(item: any) {
    of(INVENTORY_LIST_ITEMS.push(item));
  }

  deleteInventoryItem(item: any) {
    of(INVENTORY_LIST_ITEMS.splice(-1));
  }
}
