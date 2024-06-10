import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainComponent} from "./main.component";
import { UploadComponent } from './upload/upload.component';
import { ChatComponent } from './chat/chat.component';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

const routes: Routes = [
  { path: 'upload', component: UploadComponent },
  { path: 'chat', component: ChatComponent },
  { path: '', redirectTo: '/upload', pathMatch: 'full' }
];

@NgModule({
  declarations: [MainComponent, UploadComponent, ChatComponent],
  exports: [
    MainComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})
export class MainModule { }
