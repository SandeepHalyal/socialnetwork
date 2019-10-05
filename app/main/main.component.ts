import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms"
import { Router } from "@angular/router"
import { MainService } from "../main.service"
import { LoginDataInterface, SigninDataInterface } from "../all-interface"
import {CookieService} from 'ngx-cookie-service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor( private mainService: MainService, private router: Router, private cookieservice: CookieService) { }
  file: any;
  requestStatus: boolean= true;

  loginData = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })
  
  signinData = new FormGroup({
    fn: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    photo: new FormControl(),
    dob: new FormControl(),
    place: new FormControl()
  })
  @Output() profile:any;
  status: boolean = true;

  checkstatus() {
    this.status = !this.status;
    console.log(this.status)
  }

  onFileSelect(event) {
      this.file = event.target.files[0];
  }

  loginRequest() {
    console.log(this.loginData.value);
    var data: LoginDataInterface = this.loginData.value;
    this.mainService.getProfile(data).subscribe(res=>{
      let token: any= res;
      if(token.token){
      this.cookieservice.set("token", token.token)
      console.log(token)
      this.router.navigate(['/profile'])
      }else{
        this.requestStatus= token.message;
      }
    })
  }

  signinRequest() {
    console.log(this.signinData.value);
    var data: SigninDataInterface = this.signinData.value;
    data.photo= this.file;
    this.mainService.setProfile(data).subscribe(res=>{
      this.status=!this.status;
      console.log(res);
    })
  }

  ngOnInit() {
    if(this.cookieservice.get('token')){
      this.router.navigate(['/profile'])
    }
  }

}
