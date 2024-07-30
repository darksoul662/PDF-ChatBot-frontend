import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';
import {ContentModule} from "../../content/content.module";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableModule
} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    UserManagementComponent,
  ],
  exports: [
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    ContentModule,
    MatTableModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
  ]
})
export class UserManagementModule { }
