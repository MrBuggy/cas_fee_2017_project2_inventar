import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { InventoryListItem } from '../../../models/inventory-list-item';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  componentName = 'Suche';
  searchResultList: InventoryListItem[];
  searchString: string;

  constructor(private _searchService: SearchService, private toastr: ToastrService) {
  }

  search() {
    this.searchResultList = this._searchService.loadSearchResults(this.searchString);

    if (this.searchResultList.length == 0) {
      this.toastr.info('Keine Suchergebnisse gefunden!');
    }
  }
}
