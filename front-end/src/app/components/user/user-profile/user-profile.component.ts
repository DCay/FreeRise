import { Component, OnInit } from '@angular/core';
import { ChangeEmailModel } from '../../../models/change-email.model';
import { ProfileService } from '../../../services/profile.service';
import { FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { CustomValidators } from '../../../validators/custom-validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  changeEmailModel: ChangeEmailModel;

  constructor(
    private userProfileService: ProfileService,
    private router: Router
  ) {
    this.changeEmailModel = new ChangeEmailModel('', '', '',)
  }

  changeEmailForm = new FormGroup({
    "password": new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    "email": new FormControl('', [Validators.required,
      new CustomValidators().mustMatch('confirmEmail'),
    Validators.email]),
    "confirmEmail": new FormControl('', [Validators.required, Validators.email])
  })



  ngOnInit() {
  }

  changeEmail() {
    this.userProfileService.changeEmail(this.changeEmailModel)
    .subscribe(
      data => {
        console.log(data)
        this.router.navigate(['/profile'])
      },
      err => {
        console.log(err)
        // this.form.reset();dada
        // this.loginFailed = true;
        // this.errMessage = err['error']['description']
      })
  }


  get changeEmailControls() {
    return this.changeEmailForm.controls;
  }
}
