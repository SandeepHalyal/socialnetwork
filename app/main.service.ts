import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from "@angular/router"
import { SigninDataInterface, LoginDataInterface, token, photoFeed } from './all-interface';
import {CookieService} from 'ngx-cookie-service'

const baseurl = "http://localhost:3000"

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private router: Router, private http: HttpClient, private cookieservice: CookieService) { }

  setProfile(data: SigninDataInterface) {
    var formdata= new FormData();

    formdata.append('photo', data.photo)
    formdata.append('dob', data.dob)
    formdata.append('fn', data.fn)
    formdata.append('email', data.email)
    formdata.append('password', data.password)
    formdata.append('place', data.place)

    let path=  formdata.get("photo");
    console.log(path)
    return this.http.post(baseurl + "/register/signin", formdata)
  }

  getProfile(data: LoginDataInterface) {
    var body = {
      email: data.email,
      password: data.password
    }
    return this.http.post(baseurl + "/register/login", body)
  }

  getProfileDetails(token: token){
      return this.http.post(baseurl+"/profile", token)
  }

  postFeed(data: photoFeed){
    var feeddata= new FormData();

    feeddata.append('postimage',data.postimage)
    feeddata.append('desc', data.desc)
    feeddata.append('token', this.cookieservice.get('token'))
    return this.http.post(baseurl+"/profile/post", feeddata)
  }

  getFeed(token: token){
    console.log(token)
    return this.http.post(baseurl+"/profile/profilefeed", token)
  }

  getallfeed(token: token){
    return this.http.post(baseurl+"/profile/allfeed", token)

  }
  
}
