import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainComponent} from "./main.component";
import { UploadComponent } from './upload/upload.component';
import { ChatComponent } from './chat/chat.component';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { Upload1Component } from './upload1/upload1.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AuthenticationModule} from "./authentication/authentication.module";
import { Chatt1Component } from './chatt1/chatt1.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'upload1', component: Upload1Component },
  { path: 'chatt1', component: Chatt1Component },
  { path: '', redirectTo: '/chatt1', pathMatch: 'full' },
  

  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
    { path: 'chat', component: ChatComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [MainComponent, UploadComponent, ChatComponent, Upload1Component, Chatt1Component],
  exports: [
    MainComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FontAwesomeModule, // Make sure this line is present
    AuthenticationModule,
    FormsModule
  ]
})
export class MainModule { }
