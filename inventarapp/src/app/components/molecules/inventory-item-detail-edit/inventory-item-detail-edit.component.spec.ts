import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemDetailEditComponent } from './inventory-item-detail-edit.component';

describe('InventoryItemDetailEditComponent', () => {
  let component: InventoryItemDetailEditComponent;
  let fixture: ComponentFixture<InventoryItemDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryItemDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryItemDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
