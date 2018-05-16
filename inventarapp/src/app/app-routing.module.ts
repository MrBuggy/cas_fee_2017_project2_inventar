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

// Route Configuration
const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'search', component: SearchComponent },
  { path: 'inventory-items/:id', component: InventoryItemsComponent },
  { path: 'inventory-item-detail/:id/:listID', component: InventoryItemDetailComponent },
  { path: 'inventory-item-detail-edit/:id/:listID', component: InventoryItemDetailEditComponent },
  { path: 'inventory-item-detail-add/:listID', component: InventoryItemDetailAddComponent },
  { path: 'list-add', component: ListAddComponent },
  { path: 'search-detail/:id/:listID', component: SearchDetailComponent },
  { path: 'inventory-edit/:id', component: InventoryEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
