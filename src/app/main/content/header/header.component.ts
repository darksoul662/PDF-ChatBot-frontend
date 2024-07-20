import { Component } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

   userName: string = '';
  buttondisabled: boolean = false;

  constructor(private cookieService: CookieService,
              private toastr: ToastrService,
              private http: HttpClient
              ) { }

  ngOnInit(): void {
    this.userName = this.cookieService.get('name');
  }

  logout(): void {
    this.cookieService.deleteAll();
    localStorage.clear();
    this.toastr.success('Logged out successfully');
    this.buttondisabled = true;
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  }

  gotoHome() {
    if(this.cookieService.get('is_admin') === 'true') {
      window.location.href = '/admin';
    } else {
      window.location.href = '/home';
    }
  }
}
