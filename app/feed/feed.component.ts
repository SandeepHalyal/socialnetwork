import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { MainService } from "../main.service";
import { token, photoFeed } from "../all-interface";
import { Router } from "@angular/router";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  constructor(private route: Router, private cookieservice: CookieService, private service: MainService,) { }
  feedData: any={}

  token: token={
    token: this.cookieservice.get('token')
  }
  ngOnInit() {
    if(this.cookieservice.get('token')){
        this.service.getallfeed(this.token).subscribe(res=>{
          this.feedData = res;
        })
      }else{
      this.route.navigate(['/'])
      }
  }

}
