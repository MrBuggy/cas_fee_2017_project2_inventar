import { Injectable } from '@angular/core';

import { InventoryListItem } from '../models/inventory-list-item';
import { InventoryList } from '../models/inventory-list';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { QueryFn } from 'angularfire2/database/interfaces';

@Injectable()
export class SearchService {
  apiPath = '/inventoryList';
  searchTerm: string;
  searchResults: InventoryListItem[];

  constructor(private db: AngularFireDatabase) { }

  getInventoryListRef(): AngularFireList<InventoryList> {
    return this.db.list(this.apiPath) as AngularFireList<InventoryList>;
  }

  getSearchResultsRef(key, searchString): AngularFireList<InventoryListItem> {
    if (searchString) {
      searchString = searchString.toLowerCase();
    }
    this.searchTerm = searchString;

    return this.db.list(`${this.apiPath}/${key}/items`, ref =>
      ref
        .orderByChild('lowerCaseName')
        .startAt(searchString)
        .endAt(searchString + '\uf8ff')) as AngularFireList<InventoryListItem>;
  }
}
