import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from "./admin.component";
import {RouterModule} from "@angular/router";
import {ContentModule} from "../content/content.module";
import {MatTableModule} from "@angular/material/table";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {AdminService} from "./admin.service";
import {MatTab, MatTabGroup, MatTabsModule} from "@angular/material/tabs";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {UserManagementModule} from "./user-management/user-management.module";
import {AdminFileManagentModule} from "./admin-file-managent/admin-file-managent.module";

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
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    UserManagementModule,
    AdminFileManagentModule
  ],
  providers: [AdminService]
})
export class AdminModule { }
