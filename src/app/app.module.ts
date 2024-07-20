import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MainModule} from "./main/main.module";
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
// Import FontAwesomeModule
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";



const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  }
];


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule, // Make sure this line is present
    BrowserAnimationsModule,
    ReactiveFormsModule,
     ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-top-center',
            preventDuplicates: true,
            closeButton: true,
            maxOpened: 0,
            autoDismiss: true
        }),
    RouterModule.forRoot(appRoutes, {
            // enableTracing: true
        }),

    MainModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
