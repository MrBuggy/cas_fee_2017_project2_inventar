import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchService } from '../../../services/search.service';
import { InventoryListItem } from '../../../models/inventory-list-item';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  componentName = 'Suche';
  searchResultList: InventoryListItem[];
  searchString: string;
  searchForm: FormGroup;

  constructor(private _searchService: SearchService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl('', Validators.maxLength(255))
  });
}

search() {
  this.searchResultList = this._searchService.loadSearchResults(this.searchString);

  setTimeout(() => {
    if (this.searchResultList.length === 0) {
      this.toastr.info('Keine Suchergebnisse gefunden!');
    }
  }, 1000);
}
}
