import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchService } from '../../../services/search.service';
import { InventoryListItem } from '../../../models/inventory-list-item';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  componentName = 'Suche';
  searchString: string;
  searchForm: FormGroup;
  searchResultList: InventoryListItem[];
  showValidationMsg: boolean;

  constructor(
    private _searchService: SearchService,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.showValidationMsg = false;
    this.searchString = this._searchService.searchTerm || '';
    if (this._searchService.searchTerm !== undefined && this._searchService.searchTerm !== '') {
      this.search();
    }
    this.searchForm = new FormGroup({
      searchTerm: new FormControl('', Validators.maxLength(255))
    });
  }

  search() {
    this.searchResultList = [];
    this.authService.getCurrentUser().then((user) => {
      this._searchService.getInventoryListRef().snapshotChanges()
        .subscribe(actions => {
          actions.forEach(action => {
            this._searchService.getSearchResultsRef(action.key, this.searchString).snapshotChanges().subscribe(res => {
              res.forEach(element => {
                if (element.payload.val().userID !== user.uid) {
                  const obj = element.payload.val();
                  obj.$key = element.key;
                  obj.listID = action.key;
                  this.searchResultList.push(obj);
                }
              });
            });
          });
          setTimeout(() => {
            this.showValidationMsg = this.searchResultList.length <= 0;
          }, 500);
        });
    });
  }

  clearSearch() {
    this.showValidationMsg = false;
    this.searchString = undefined;
    this._searchService.searchTerm = undefined;
    this.searchResultList = [];
  }
}
