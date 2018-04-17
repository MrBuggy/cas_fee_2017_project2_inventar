import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemDetailAddComponent } from './inventory-item-detail-add.component';

describe('InventoryItemDetailAddComponent', () => {
  let component: InventoryItemDetailAddComponent;
  let fixture: ComponentFixture<InventoryItemDetailAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryItemDetailAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryItemDetailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
