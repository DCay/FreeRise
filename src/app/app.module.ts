import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NavigationComponent } from './components/shared-components/navigation/navigation.component';
import { FooterComponent } from './components/shared-components/footer/footer.component';
import { AppRoutingModule } from './app-routing';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavigationComponent,
    FooterComponent,
    ErrorComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
