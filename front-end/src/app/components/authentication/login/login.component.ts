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
  data: object;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.model = new LoginModel('', '')
  }


  form = new FormGroup({
    "username": new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]+'), Validators.minLength(5), Validators.maxLength(15)]),
    "password": new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)])
  })

  ngOnInit() {
  }

  get diagnostics() {
    return JSON.stringify(this.form.value);
  }

  loginUser() {
    console.log(this.model)
    this.authService.login(this.model)
      .subscribe(
        data => {
          console.log(data)
     
          let tokenExtracted = JSON.parse(atob(data['authToken'].split('.')[1]));
          let user = tokenExtracted.data.username;
          let type = tokenExtracted.data.type;
    

          localStorage.setItem('authToken', tokenExtracted);
          localStorage.setItem('userName', user);
          localStorage.setItem('userType', type);

          ///Auth: Bearer - usertoken
          this.router.navigate(['/home'])
        },
        err => {
          console.log(err)
        })
  }

  get f() {
    return this.form.controls;
  }
}
