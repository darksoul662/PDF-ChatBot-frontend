import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from "./admin.component";
import {RouterModule} from "@angular/router";
import {ContentModule} from "../content/content.module";
import {MatTableModule} from "@angular/material/table";
import {MatButton} from "@angular/material/button";
import {AdminService} from "./admin.service";

const routes = [
  {
    path: 'admin', component: AdminComponent
  }
  ];

@NgModule({
  declarations: [AdminComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ContentModule,
    MatTableModule,
    MatButton,
  ],
  providers: [AdminService]
})
export class AdminModule { }
