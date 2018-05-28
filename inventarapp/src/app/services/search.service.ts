import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { InventoryListItem } from '../models/inventory-list-item';
import { InventoryList } from '../models/inventory-list';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { QueryFn } from 'angularfire2/database/interfaces';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class SearchService {
  apiPath = '/inventoryList';
  searchTerm: string;
  inventoryListsRef: AngularFireList<InventoryList>;
  searchResults: InventoryListItem[];

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private toastr: ToastrService) {
    this.inventoryListsRef = db.list(this.apiPath);
  }

  loadSearchResults(searchString: string): InventoryListItem[] {
    if (searchString) {
      searchString = searchString.toLowerCase();
    }

    this.searchTerm = searchString;
    this.searchResults = [];
    this.authService.getCurrentUser().then((user) => {
      this.db.list(this.apiPath).snapshotChanges().subscribe(datas => {
        datas.forEach(data => {
          const path = `${this.apiPath}/${data.key}/items`;
          this.db.list(path, ref =>
            ref
              .orderByChild('lowerCaseName')
              .startAt(searchString)
              .endAt(searchString + '\uf8ff'))
            .snapshotChanges().subscribe(items =>
              items.forEach(item => {
                if (item.payload.val().userID !== user.uid) {
                  const obj = item.payload.val();
                  obj.$key = item.key;
                  obj.listID = data.key;
                  this.searchResults.push(obj);
                }
              }));
        });
      });
    }, err => {
      this.toastr.error('Suche konnte nicht ausgeführt werden!');
    });

    return this.searchResults;
  }
}
