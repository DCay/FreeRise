import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterModel } from '../../../models/register.model';
import { FormGroup, FormControl } from '@angular/forms';

export interface AutoCompleteModel {
  value: any;
  display: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: RegisterModel;

  public items = [
    { display: 'Jquery' },
    { display: 'Angular' },
    { display: 'Wordpress' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.model = new RegisterModel('', '', '', '', '')
  }

  form = new FormGroup({
    "username": new FormControl(''),
    "password": new FormControl(''),
    "firstName": new FormControl(''),
    "lastName": new FormControl(''),
    "email": new FormControl(''),
  })

  get diagnostics() {
    return JSON.stringify(this.form.value);
  }

  ngOnInit() {

    $(function () {

      $('#login-form-link').click(function (e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
      });
      $('#register-form-link').click(function (e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
      });

    });
  }

  registerClient() {
    console.log(this.model)
    this.authService.registerClient(this.model)
    .subscribe(
      data => {
        console.log(data)
        this.router.navigate(['/login'])
      },
      err => {
        console.log(err)
        // this.form.reset();
        // this.loginFailed = true;
        // this.errMessage = err['error']['description']
      })
  }
}


