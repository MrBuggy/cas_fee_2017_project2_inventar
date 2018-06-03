import { Component, OnInit, Input } from '@angular/core';
import { InventoryListItem } from '../../../models/inventory-list-item';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() item: InventoryListItem;
  @Input() displayString: string;
  @Input() routerLink: string;
  @Input() rating: number;

  constructor() { }

  ngOnInit() {
  }
}
