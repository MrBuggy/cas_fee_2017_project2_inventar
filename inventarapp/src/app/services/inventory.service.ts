import { Injectable } from "@angular/core";

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { InventoryList } from "../models/inventory-list";
import { INVENTORY_LIST } from "../models/inventory-lists";
import { InventoryListItem } from "../models/inventory-list-item";
import { INVENTORY_LIST_ITEMS } from "../models/inventory-list-items";

@Injectable()
export class InventoryService {
  constructor() {}

  loadInventoryList(): Observable<InventoryList[]> {
      return of(INVENTORY_LIST);
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
