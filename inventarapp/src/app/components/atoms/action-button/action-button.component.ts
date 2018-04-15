import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent implements OnInit {
  @Input() stateList: Object;
  @Output() onBtnClick = new EventEmitter<undefined>();

  constructor() { }

  ngOnInit() {
  }

}
