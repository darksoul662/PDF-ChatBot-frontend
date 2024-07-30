import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor( private http:HttpClient) { }

  getUsers(){
    return this.http.get('http://localhost:8000/admin/user');
  }
  blockUser(id: number){
    return this.http.post('http://localhost:8000/admin/user', {id: id,status: true});
  }

  unblockUser(id: number){
    return this.http.post('http://localhost:8000/admin/user', {id: id,status: false});
  }
  deleteUser(id: number){
    return this.http.delete('http://localhost:8000/admin/user?id='+id);
  }

  getFullFileDetails(){
    return this.http.get('http://127.0.0.1:8000/file/full');
  }

  deleteFile(id: number){
    return this.http.delete('http://localhost:8000/file?id='+id);
  }

downloadFile(id: number) {
  return this.http.get('http://localhost:8000/file/download/' + id, { responseType: 'blob' });
}

}
