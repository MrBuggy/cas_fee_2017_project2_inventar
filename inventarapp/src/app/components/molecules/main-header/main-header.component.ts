import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() hasBack: boolean;
  @Input() hasCancel: boolean;

  @Output() onBtnBack = new EventEmitter<undefined>();
  @Output() onBtnCancel = new EventEmitter<undefined>();

  constructor() { }

  ngOnInit() {
  }

}
