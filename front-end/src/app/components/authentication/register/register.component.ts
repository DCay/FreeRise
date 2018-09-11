import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterModel } from '../../../models/register.model';
import { FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { RegisterFreelancerModel } from '../../../models/register-freelancer.model';


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
  extractedTags: any[];
  freeLancerModel: RegisterFreelancerModel;
  freelancerButton = "#9AC8E9";
  clientButton = "#238ff9";

  public items = [
    { display: 'Jquery', value: 'Jquery' },
    { display: 'Angular', value: 'Angular' },
    { display: 'Wordpress', value: 'Wordpress' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.model = new RegisterModel('', '', '', '', '')
    this.freeLancerModel = new RegisterFreelancerModel('', '', '', '', '', [])
  }

  form = new FormGroup({
    "username": new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]+'), Validators.minLength(5), Validators.maxLength(15)]),
    "password": new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    "firstName": new FormControl('', [Validators.required, Validators.pattern('[а-яА-Яa-zA-Z]+'), Validators.minLength(1), Validators.maxLength(20)]),
    "lastName": new FormControl('', [Validators.required, Validators.pattern('[а-яА-Яa-zA-Z]+'), Validators.minLength(1), Validators.maxLength(20)]),
    "email": new FormControl('', [Validators.required, Validators.email]),
  })

  freeLancerForm = new FormGroup({
    "username": new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]+'), Validators.minLength(5), Validators.maxLength(15)]),
    "password": new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    "firstName": new FormControl('', [Validators.required, Validators.pattern('[а-яА-Яa-zA-Z]+'), Validators.minLength(1), Validators.maxLength(20)]),
    "lastName": new FormControl('', [Validators.required, Validators.pattern('[а-яА-Яa-zA-Z]+'), Validators.minLength(1), Validators.maxLength(20)]),
    "email": new FormControl('', [Validators.required, Validators.email]),
    "skills": new FormControl('')
  })


  get diagnostics() {
    return JSON.stringify(this.form.value);
  }

  get diagnostics2() {
    return JSON.stringify(this.freeLancerForm.value);
  }

  ngOnInit() {
  }

  get f() {
    return this.form.controls;
  }
  get fr() {
    return this.freeLancerForm.controls;
  }

  registerClient() {
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
  registerFreelancer() {
    let model = this.freeLancerModel;
    this.extractedTags = model.skills.map((x) => x['value']);
    model['skills'] = this.extractedTags;

    this.authService.registerFreelancer(model)
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

  changeColor(e) {
    this.freelancerButton = this.freelancerButton === "#9AC8E9" ? " #238ff9" : "#9AC8E9";
    this.clientButton = this.clientButton === "#9AC8E9" ? "#238ff9" : "#9AC8E9";

  }
}


