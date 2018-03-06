import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class NavigationService {
  constructor(private http: Http) {}

  loadNavigationList() {
    return this.http.get('/assets/mock/navigation/list.json')
      .map((res: Response) => res.json());
  }
}
