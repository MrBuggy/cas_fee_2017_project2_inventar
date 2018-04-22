import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { InventoryListItem } from "../models/inventory-list-item";
import { INVENTORY_LIST_ITEMS } from "../models/inventory-list-items";

@Injectable()
export class SearchService {

  constructor() { }

  loadSearchResults(searchString: string): Observable<InventoryListItem[]> {
    // TODO: SUECHEREGNISSE LADEN UND ANALOG INVENTORY-LIST ZURUECK GEBEN
    return of(INVENTORY_LIST_ITEMS);
  }
}
