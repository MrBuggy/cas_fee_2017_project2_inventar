import { Component, OnInit } from '@angular/core';
import { SearchService } from "../../../services/search.service";
import { InventoryListItem } from "../../../models/inventory-list-item";
import { INVENTORY_LIST_ITEMS } from "../../../models/inventory-list-items";

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  componentName = 'Suche';
  searchResultList: InventoryListItem[];
  searchString: string;

  constructor(private _searchService: SearchService) {
  }

  ngOnInit() {
  }

  search() {
    this._searchService.loadSearchResults(this.searchString).subscribe(searchResultList => this.searchResultList = searchResultList);
  }
}
