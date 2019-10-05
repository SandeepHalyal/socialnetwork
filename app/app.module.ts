import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { MainComponent } from './main/main.component';
import { FeedComponent } from './feed/feed.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ReactiveFormsModule } from "@angular/forms";
import { SetupComponent } from './setup/setup.component'
import { HttpClientModule } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service'

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    MainComponent,
    FeedComponent,
    EditProfileComponent,
    SetupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, FormsModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
