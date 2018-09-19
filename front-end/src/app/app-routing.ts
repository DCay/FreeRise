import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {ErrorComponent} from './components/error/error.component';
import {LoginComponent} from './components/authentication/login/login.component';
import {RegisterComponent} from './components/authentication/register/register.component';
import {ResetComponent} from './components/authentication/reset/reset.component';
import {UserProfileComponent} from './components/user/user-profile/user-profile.component';
import {HomeComponent} from './components/home/home.component';
import {ContactUsComponent} from './components/contact-us/contact-us.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset', component: ResetComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'createProject', component: CreateProjectComponent},
  {path: 'home', component: HomeComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: '', component: LandingPageComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
