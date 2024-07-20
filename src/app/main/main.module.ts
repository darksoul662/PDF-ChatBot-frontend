import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainComponent} from "./main.component";
import { ChatComponent } from './content/chat/chat.component';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AuthenticationModule} from "./authentication/authentication.module";
import {ContentModule} from "./content/content.module";

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: '',
    loadChildren: () => import('./content/content.module').then(m => m.ContentModule)
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [MainComponent],
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
    ContentModule,
  ]
})
export class MainModule { }
