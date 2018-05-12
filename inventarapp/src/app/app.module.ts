import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

/* COMPONENTS */
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/molecules/navigation/navigation.component';
import { MainHeaderComponent } from './components/molecules/main-header/main-header.component';
import { ProfileComponent } from './components/molecules/profile/profile.component';
import { InventoryComponent } from './components/molecules/inventory/inventory.component';
import { SearchComponent } from './components/molecules/search/search.component';
import { InventoryItemsComponent } from './components/molecules/inventory-items/inventory-items.component';
import { ListComponent } from './components/molecules/list/list.component';
import { InventoryItemDetailComponent } from './components/molecules/inventory-item-detail/inventory-item-detail.component';
import { InventoryItemDetailEditComponent } from './components/molecules/inventory-item-detail-edit/inventory-item-detail-edit.component';
import { InventoryItemDetailAddComponent } from './components/molecules/inventory-item-detail-add/inventory-item-detail-add.component';
import { ListAddComponent } from './components/molecules/list-add/list-add.component';
import { SearchDetailComponent } from './components/molecules/search-detail/search-detail.component';

/* SERVICES */
import { NavigationService } from './services/navigation.service';
import { InventoryService } from './services/inventory.service';
import { StateService } from './services/state.service';

/* BACKEND */
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { ActionButtonComponent } from './components/atoms/action-button/action-button.component';
import { IconComponent } from './components/atoms/icon/icon.component';
import { SearchService } from './services/search.service';
import { UserService } from './services/user.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MainHeaderComponent,
    ProfileComponent,
    InventoryComponent,
    SearchComponent,
    InventoryItemsComponent,
    ListComponent,
    InventoryItemDetailComponent,
    ActionButtonComponent,
    IconComponent,
    InventoryItemDetailEditComponent,
    InventoryItemDetailAddComponent,
    ListAddComponent,
    SearchDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [
    NavigationService,
    InventoryService,
    StateService,
    SearchService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
