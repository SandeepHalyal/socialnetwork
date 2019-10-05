import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms"
import {MainService} from '../main.service'

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  constructor(private mainService: MainService) { }
  setupData = new FormGroup({
    photo: new FormControl(),
    fn: new FormControl(),
    dob: new FormControl(),
    place: new FormControl()
  })
  ngOnInit() {
  }
}
