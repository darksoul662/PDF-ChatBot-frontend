import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthenticationService } from './authentication.service';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {AuthenticationComponent} from "./authentication.component";

const authRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AuthenticationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    FaIconComponent
  ],
  providers: [AuthenticationService]
})
export class AuthenticationModule { }
