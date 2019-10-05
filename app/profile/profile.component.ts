import { Component, OnInit, Input } from '@angular/core';
import { MainService } from "../main.service";
import {CookieService} from 'ngx-cookie-service'
import { token, photoFeed } from "../all-interface";
import { Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileDetails:any={}
  photoFile: any={};
  profilePic="http://localhost:3000/tmp/img/profile.jpg"
  feedData: any;

  postFeed= new FormGroup({
    desc: new FormControl(),
    postimage: new FormControl()
  })
  date: number= Date.now()
  constructor(private route: Router, private service: MainService, private cookieservice: CookieService) { }
  
  token: token={
    token: this.cookieservice.get('token')
  }
  ngOnInit() {
   if(this.cookieservice.get('token')){
    this.service.getProfileDetails(this.token).subscribe(pres=>{
      this.profileDetails=pres;
      console.log(this.profileDetails)
      this.getfeed()
      this.route.navigate(['/profile'])
    })}else{
    this.route.navigate(['/'])
    }
  }

  onFileSelect(event){
    this.photoFile= event.target.files[0]
  }

  postfeed(){
    var data: photoFeed= this.postFeed.value;
    data.postimage= this.photoFile;
    this.service.postFeed(data).subscribe(res=>{
      console.log(res)
    })
  }

  getfeed(){
    this.service.getFeed(this.token).subscribe(res=>{
      this.feedData= res;
    })
  }

}


