import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { InventoryList } from '../models/inventory-list';
import { InventoryListItem } from '../models/inventory-list-item';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { QueryFn } from 'angularfire2/database/interfaces';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators/take';

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
      }, err => {
        this.toastr.error('Liste konnte nicht geladen werden!');
      }
      );
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

  addInventoryItem(item: InventoryListItem, listID: string) {
    const path = `${this.apiPath}/${listID}/items`;
    this.authService.getCurrentUser().then(user => {
      this.db.list(path).push({
        name: item.name,
        count: item.count,
        value: item.value,
        hasWarning: false,
        userID: user.uid,
        userRated: [],
        rating: 0,
        lending: {}
      });
      this.toastr.success('Element erfolgreich hinzugefügt!');
    }, err => {
      console.log(err);
    });
  }

  editInventoryItem(item: InventoryListItem, key: string, listID: string) {
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
      list.userMail = result.email;
      list.userName = result.displayName;
      list.items = new Array<InventoryListItem>();
      this.inventoryListsRef.push(list);
      this.toastr.success('Liste erfolgreich hinzugefügt!');
    }, err => {
      this.toastr.error('Liste konnte nicht erstellt werden!');
    });
  }

  rateItem(key: string, listID: string) {
    const path = `${this.apiPath}/${listID}/items/${key}`;
    const item = this.db.object<InventoryListItem>(path);
    this.authService.getCurrentUser().then((user) => {
      item.valueChanges().pipe(take(1)).subscribe(data => {
        if (data.userRated === undefined) {
          data.userRated = [];
        }

        data.userRated.push(user.uid);
        item.update({ rating: data.rating + 1, userRated: data.userRated });
      });
    }, err => {
      this.toastr.error('Item konnte nicht bewertet werden!');
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
