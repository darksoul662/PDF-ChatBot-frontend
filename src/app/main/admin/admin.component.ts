import { Component } from '@angular/core';
import {AdminService} from "./admin.service";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {CookieService} from "ngx-cookie-service";

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

  constructor(private cookieService: CookieService) {
    if(this.cookieService.get('is_admin') !== 'true') {
      window.location.href = '/login';
    }
  }

  activeTab = 0;

  onTabChange(event: MatTabChangeEvent) {
    this.activeTab = event.index;
  }
}
