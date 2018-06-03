import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { StateList } from '../../../models/state';

@Component({
  selector: 'action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent implements OnInit {
  @Input() stateList: StateList;
  @Output() btnClick = new EventEmitter<undefined>();

  constructor() { }

  ngOnInit() {
  }
}
