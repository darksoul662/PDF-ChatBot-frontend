import { Component } from '@angular/core';
import {AdminService} from "./admin.service";
import {MatTabChangeEvent} from "@angular/material/tabs";

export interface User {
  id: number;
  name: string;
  email: string;
  last_login: string;
  is_admin: boolean;
  is_blocked: boolean;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  activeTab = 0;

  onTabChange(event: MatTabChangeEvent) {
    this.activeTab = event.index;
  }
}
