import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NavigationComponent } from './components/shared-components/navigation/navigation.component';
import { FooterComponent } from './components/shared-components/footer/footer.component';
import { AppRoutingModule } from './app-routing';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import {TagRegisterComponent} from './shared/tag-register-component'; //!!!! MOVE
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterJqueryDirective } from './directives/register-jquery.directive';



@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavigationComponent,
    FooterComponent,
    ErrorComponent,
    LoginComponent,
    RegisterComponent,
    TagRegisterComponent,
    RegisterJqueryDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TagInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}), //DEPRICATED FORM MODEL
    HttpClientModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
