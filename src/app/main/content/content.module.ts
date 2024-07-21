import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../authentication/login/login.component";
import {SignupComponent} from "../authentication/signup/signup.component";
import {ChatComponent} from "./chat/chat.component";
import {UploadComponent} from "./upload/upload.component";
import {Upload1Component} from "./upload1/upload1.component";
import {Chatt1Component} from "./chatt1/chatt1.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from "./header/header.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {NgxSpinnerComponent, NgxSpinnerModule} from "ngx-spinner";
import {LoadingBarHttpClientModule} from "@ngx-loading-bar/http-client";
import {LoadingBarModule} from "@ngx-loading-bar/core";


const authRoutes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'upload1', component: Upload1Component },
  { path: 'chatt1', component: Chatt1Component },
  { path: '', redirectTo: '/upload1', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    ChatComponent,
    UploadComponent,
    Upload1Component,
    Chatt1Component,
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    ReactiveFormsModule,
    FormsModule,
    LoadingBarModule,
    NgxSpinnerModule,
    MatProgressBarModule,
    NgxSpinnerComponent
  ]
})
export class ContentModule { }
