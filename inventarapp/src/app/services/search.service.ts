import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { InventoryListItem } from '../models/inventory-list-item';
import { InventoryList } from '../models/inventory-list';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { QueryFn } from 'angularfire2/database/interfaces';

@Injectable()
export class SearchService {
  private apiPath = '/inventoryList';

  inventoryListsRef: AngularFireList<InventoryList>;
  searchResults: InventoryListItem[];

  constructor(private db: AngularFireDatabase) {
    this.searchResults = [];
    this.inventoryListsRef = db.list(this.apiPath);
  }

  loadSearchResults(searchString: string): InventoryListItem[] {
    this.db.list(this.apiPath).snapshotChanges().subscribe(datas => {
      datas.forEach(data => {
        const path = `${this.apiPath}/${data.key}/items`;
        this.db.list(path).snapshotChanges().subscribe(items =>
          items.forEach(item => {
            this.searchResults.push(item.payload.val());
          }));
      });
    });

    return this.searchResults;
  }
}
