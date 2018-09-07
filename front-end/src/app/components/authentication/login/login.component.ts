import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

import * as $ from 'jquery';
import { LoginModel } from '../../../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: LoginModel;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.model = new LoginModel('', '')
  }


  form = new FormGroup({
    "username": new FormControl(''),
    "password": new FormControl('')
  })

  ngOnInit() {
  }

  get diagnostics() {
    return JSON.stringify(this.form.value);
  }

  login() {
    console.log(this.model)
    this.authService.login(this.model)
      .subscribe(
        data => {
          console.log(data)
        },
        err => {
          console.log(err)
        })
  }
}
