import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

/* COMPONENTS */
import { AppComponent } from './app.component';

/* SERVICES */
import { NavigationService } from './services/navigation.service';
import { NavigationComponent } from './components/molecules/navigation/navigation.component';
import { HeaderComponent } from './components/molecules/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule
  ],
  providers: [NavigationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
