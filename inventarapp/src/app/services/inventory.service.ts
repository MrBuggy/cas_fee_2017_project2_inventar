import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class InventoryService {
  constructor(private http: Http) {}

  loadInventoryList() {
    return this.http.get('/assets/mock/inventory/list/list.json')
      .map((res: Response) => res.json());
  }

  loadInventoryItemsList() {
    return this.http.get('/assets/mock/inventory/list/list-items.json')
      .map((res: Response) => res.json());
  }
}
