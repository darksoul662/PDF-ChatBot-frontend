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
