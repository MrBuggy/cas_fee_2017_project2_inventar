import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
import { AuthGuard } from './utilities/auth.guard';
import { InventoryEditComponent } from './components/molecules/inventory-edit/inventory-edit.component';
import { ProfileEditComponent } from './components/molecules/profile-edit/profile-edit.component';

// Route Configuration
const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'inventory-items/:id', component: InventoryItemsComponent, canActivate: [AuthGuard] },
  { path: 'inventory-item-detail/:id/:listID', component: InventoryItemDetailComponent, canActivate: [AuthGuard] },
  { path: 'inventory-item-detail-edit/:id/:listID', component: InventoryItemDetailEditComponent, canActivate: [AuthGuard] },
  { path: 'inventory-item-detail-add/:listID', component: InventoryItemDetailAddComponent, canActivate: [AuthGuard] },
  { path: 'list-add', component: ListAddComponent, canActivate: [AuthGuard] },
  { path: 'search-detail/:id/:listID', component: SearchDetailComponent, canActivate: [AuthGuard] },
  { path: 'inventory-edit/:id', component: InventoryEditComponent, canActivate: [AuthGuard] },
  { path: 'profile-edit', component: ProfileEditComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
