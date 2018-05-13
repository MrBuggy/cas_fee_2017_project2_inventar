import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() hasBack: boolean;
  @Input() hasCancel: boolean;

  @Output() btnBack = new EventEmitter<undefined>();
  @Output() btnCancel = new EventEmitter<undefined>();

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logoutUser();
  }

}
