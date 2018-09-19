import { Component, OnInit } from '@angular/core';
import { ChangeEmailModel } from '../../../models/change-email.model';
import { ProfileService } from '../../../services/profile.service';
import { FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { CustomValidators } from '../../../validators/custom-validators';
import { Router } from '@angular/router';
import { ChangePasswordModel } from '../../../models/change-password.model';
import { DeleteProfileModel } from '../../../models/delete-profile.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  changeEmailModel: ChangeEmailModel;
  changePasswordModel: ChangePasswordModel;
  deleteProfileModel: DeleteProfileModel;

  constructor(
    private userProfileService: ProfileService,
    private router: Router
  ) {
    this.changeEmailModel = new ChangeEmailModel('', '', '')
    this.changePasswordModel = new ChangePasswordModel('', '', '')
    this.deleteProfileModel = new DeleteProfileModel('', '')
  }

  changeEmailForm = new FormGroup({
    "password": new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    "email": new FormControl('', [Validators.required,
    new CustomValidators().mustMatch('confirmEmail'),
    Validators.email]),
    "confirmEmail": new FormControl('', [Validators.required, Validators.email])
  })

  changePasswordForm = new FormGroup({
    "oldPassword": new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    "newPassword": new FormControl('', [Validators.required,
    new CustomValidators().mustMatch('confirmNewPassword'),
    Validators.minLength(5), Validators.maxLength(30)]),
    "confirmNewPassword": new FormControl('', [Validators.required,
    Validators.minLength(5), Validators.maxLength(30)])
  })

  deleteProfileForm = new FormGroup({
    "password": new FormControl('', [Validators.required,
    new CustomValidators().mustMatch('confirmPassword'),
    Validators.minLength(5), Validators.maxLength(30)]),
    "confirmPassword": new FormControl('', [Validators.required,
    Validators.minLength(5), Validators.maxLength(30)])
  })



  ngOnInit() {
  }

  changeEmail() {
    this.userProfileService.changeEmail(this.changeEmailModel)
      .subscribe(
        data => {
          console.log(data)
          this.router.navigate(['/home'])
        },
        err => {
          console.log(err)
          // this.form.reset();dada
          // this.loginFailed = true;
          // this.errMessage = err['error']['description']
        })
  }

  changePassword() {
    this.userProfileService.changePassword(this.changePasswordModel)
      .subscribe(
        data => {
          console.log(data)
          this.router.navigate(['/home'])
        },
        err => {
          console.log(err)
          // this.form.reset();dada
          // this.loginFailed = true;
          // this.errMessage = err['error']['description']
        })
  }

  deleteProfile() {
    this.userProfileService.deleteProfile(this.deleteProfileModel)
      .subscribe(
        data => {
          console.log(data)
          localStorage.clear();
          this.router.navigate(['/home'])
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
  get changePasswordControls() {
    return this.changePasswordForm.controls;
  }
  get deleteProfileControls() {
    return this.deleteProfileForm.controls;
  }
}
