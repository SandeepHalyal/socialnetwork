import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from "./main/main.component"
import { FeedComponent } from "./feed/feed.component"
import { ProfileComponent } from "./profile/profile.component"
import { SetupComponent } from './setup/setup.component';

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "profile", component: ProfileComponent },
  { path: "feed", component: FeedComponent },
  { path: "setup", component: SetupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
