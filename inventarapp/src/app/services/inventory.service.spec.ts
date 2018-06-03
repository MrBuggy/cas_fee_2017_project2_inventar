import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { InventoryService } from './inventory.service';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { SearchService } from './search.service';
import { InventoryList } from '../models/inventory-list';
import { Observable } from 'rxjs/Observable';
import { ToastrModule } from 'ngx-toastr';

const mockLists: InventoryList[] = [
  { $key: 'Key1', name: 'List1', hasWarning: false, userID: 'UserId' },
  { $key: 'Key2', name: 'List2', hasWarning: false, userID: 'UserId' },
  { $key: 'Key3', name: 'List3', hasWarning: false, userID: 'UserId' }
];

const mockList: InventoryList = {
  $key: 'Key4',
  name: 'List4',
  hasWarning: false,
  userID: 'UserId'
};

const angularFireDbStub = {
  list: () => { },
  object: () => ({ valueChanges: () => { }, update: () => { }, remove: () => { } }),
  push: () => { }
};

describe('InventoryServiceTest', () => {
  beforeEach(() => {
    // Faking the Firebase (v5) functionallity
    spyOn(angularFireDbStub, 'list').and.returnValue(mockLists);
    spyOn(angularFireDbStub, 'push').and.callFake((data) => {
      mockLists.push(data);
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        ToastrModule.forRoot()
      ],
      providers: [
        AuthService,
        SearchService,
        InventoryService, {
          provide: AngularFireDatabase, useValue: angularFireDbStub
        }
      ]
    });
  });

  it('should add a new list with the service', inject([InventoryService], (service: InventoryService) => {
    const numberOfOriginalLists = mockLists.length;

    service.addList(mockList);

    expect(mockLists.length).toEqual(numberOfOriginalLists + 1);
  }));

  it('should load the correct list by key', inject([InventoryService], (service: InventoryService) => {
    // make sure list is added to the mock-list
    service.addList(mockList);

    // Create spy on firebase observable
    spyOn(service, 'loadSingleInventoryList').and.callFake((key) => {
      return Observable.of(mockLists.find(item => item.$key === key));
    });

    service.loadSingleInventoryList(mockList.$key).subscribe((item) => {
      expect(service.loadSingleInventoryList).toHaveBeenCalled();
      expect(item).toEqual(mockList);
    });
  }));

  it('should update the list item correctly', inject([InventoryService], (service: InventoryService) => {
    const updateName = 'UpdatedName';
    service.addList(mockList);

    spyOn(service, 'updateSingleInventoryList').and.callFake((key, name) => {
      mockLists.find(item => item.$key === key).name = name;
    });

    service.updateSingleInventoryList(mockList.$key, updateName);

    expect(service.updateSingleInventoryList).toHaveBeenCalled();
    expect(mockList.name).toEqual(updateName);
  }));

  it('should remove the item from list by key', inject([InventoryService], (service: InventoryService) => {
    service.addList(mockList);

    spyOn(service, 'deleteSingleInventoryList').and.callFake((key) => {
      mockLists.splice(mockLists.findIndex(item => item.$key === key));
    });

    expect(mockLists.includes(mockList)).toBeTruthy();

    service.deleteSingleInventoryList(mockList.$key);

    expect(service.deleteSingleInventoryList).toHaveBeenCalled();
    expect(mockLists.includes(mockList)).toBeFalsy();
  }));
});
