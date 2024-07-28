import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminFileManagentComponent} from "./admin-file-managent.component";
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
import {ContentModule} from "../../content/content.module";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {AppModule} from "../../../app.module";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";



@NgModule({
  declarations: [AdminFileManagentComponent],
  exports: [
    AdminFileManagentComponent
  ],
  imports: [
    CommonModule,
    ContentModule,
    MatTableModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule
  ]
})
export class AdminFileManagentModule { }
