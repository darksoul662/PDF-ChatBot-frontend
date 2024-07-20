import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  base_url = 'http://localhost:8000';
  constructor(private http:HttpClient) { }

   login(email: string, password: string) {
    const payload = {
      "email": email,
      "password": password
    }
    return this.http.post(this.base_url+'/login/login', payload);
  }

  register(payload:any){

    return this.http.post(this.base_url+'/login/register', payload);

  }

}
