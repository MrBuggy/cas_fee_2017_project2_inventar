import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

/* COMPONENTS */
import { AppComponent } from './app.component';

/* SERVICES */
import { NavigationService } from './services/navigation.service';
import { NavigationComponent } from './components/molecules/navigation/navigation.component';
import { MainHeaderComponent } from './components/molecules/main-header/main-header.component';
import { ProfileComponent } from './components/molecules/profile/profile.component';
import { InventoryComponent } from './components/molecules/inventory/inventory.component';
import { SearchComponent } from './components/molecules/search/search.component';
import { SocietyComponent } from './components/molecules/society/society.component';

// Route Configuration
const appRoutes: Routes = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'search', component: SearchComponent },
  { path: 'society', component: SocietyComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MainHeaderComponent,
    ProfileComponent,
    InventoryComponent,
    SearchComponent,
    SocietyComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [NavigationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
