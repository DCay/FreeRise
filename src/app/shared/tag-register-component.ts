import { Component, OnInit } from '@angular/core';

export interface AutoCompleteModel {
    value: any;
    display: string;
 }

@Component({
  selector: 'app-tag-register',
  templateUrl: './tag-register-component.html',
  styleUrls: ['./tag-register-component.css']
})
export class TagRegisterComponent implements OnInit {

  public items = [
    {display: 'Jquery'},
    {display: 'Angular'},
    {display: 'Wordpress'},
  ];

  constructor() { }

  ngOnInit() {
  }

}