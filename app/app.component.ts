import { Component } from '@angular/core';
import {CookieService} from 'ngx-cookie-service'
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SocialNetwork'
  constructor(private route: Router,  private cookieservice: CookieService){}
  logout(){
    this.cookieservice.delete('token')
    this.route.navigate(['/'])
  }
}
