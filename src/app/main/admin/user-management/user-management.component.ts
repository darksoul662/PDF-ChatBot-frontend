import { Component } from '@angular/core';
import {AdminService} from "../admin.service";
import {User} from "../admin.component";
import {position} from "html2canvas/dist/types/css/property-descriptors/position";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {

  displayedColumns: string[] = ['id', 'name', 'email',  'is_admin', 'is_blocked','delete'];
  users: User[] = [
    {
      id: 1,
      name: 'admin',
      email: 'admin@123.com',
      last_login: '2024-07-20T09:35:13.798688Z',
      is_admin: true,
      is_blocked: false
    },
    {
      id: 1,
      name: 'laxman',
      email: 'laxman@krinati.co',
      last_login: '2024-07-20T10:10:05.483424Z',
      is_admin: false,
      is_blocked: false
    },
    {
      id: 1,
      name: 'manu@gmail.com',
      email: 'laxmanr566@gmail.com',
      last_login: '2024-07-22T06:24:54.383622Z',
      is_admin: false,
      is_blocked: false
    }
  ];
  constructor(private adminService: AdminService) {
    this.adminService.getUsers().subscribe((data) => {
      // @ts-ignore
      if(data && data['status']==true){
        // @ts-ignore
        this.users = data['data'];
      }
    });
  }

  blockUser(user: User){
    this.adminService.blockUser(user.id).subscribe((data) => {
      // @ts-ignore
      if(data && data['status']==true){
        user.is_blocked = true;
      }
    });
  }

   UnblockUser(user: User){
    this.adminService.unblockUser(user.id).subscribe((data) => {
      // @ts-ignore
      if(data && data['status']==true){
        user.is_blocked = false;
      }
    });
  }
  deleteUser(user: User){
    this.adminService.deleteUser(user.id).subscribe((data) => {
      // @ts-ignore
      if(data && data['status']==true){
          this.users = this.users.filter((u) => u.id != user.id);
      }
    });
  }

}
