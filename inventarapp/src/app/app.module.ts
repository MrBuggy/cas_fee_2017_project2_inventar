import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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
import { LoginComponent } from './components/molecules/login/login.component';
import { ActionButtonComponent } from './components/molecules/action-button/action-button.component';
import { ProfileEditComponent } from './components/molecules/profile-edit/profile-edit.component';

/* SERVICES */
import { NavigationService } from './services/navigation.service';
import { InventoryService } from './services/inventory.service';
import { StateService } from './services/state.service';
import { AuthService } from './services/auth.service';

/* BACKEND */
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { SearchService } from './services/search.service';
import { AppRoutingModule } from './app-routing.module';
import { InventoryEditComponent } from './components/molecules/inventory-edit/inventory-edit.component';

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
    InventoryItemDetailEditComponent,
    InventoryItemDetailAddComponent,
    ListAddComponent,
    SearchDetailComponent,
    LoginComponent,
    InventoryEditComponent,
    ProfileEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    NavigationService,
    InventoryService,
    StateService,
    SearchService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
