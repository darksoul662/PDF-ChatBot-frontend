import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  selectedFile: any = null;

  constructor(private http: HttpClient, private router:Router) { }

  onFileSelected(event:any) {
    this.selectedFile = <File>event.target.files[0];
  }

  onSubmit(event: Event) {
  event.preventDefault();
  const formData = new FormData();
  formData.append('file', this.selectedFile, this.selectedFile.name);

  const headers = new HttpHeaders({
    // 'Content-Type': 'multipart/form-data; boundary=--------------------------254709419031316058436862',
    'Content-Length': '55051',
    'User-Agent': 'PostmanRuntime/7.39.0',
    'Accept': '*/*',
    // 'Postman-Token': '6b699119-cd9b-4737-82e1-8d491026ba08',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive'
  });


  console.log(formData)
  this.http.post('http://localhost:8000/api/FileUploadView/', formData, { headers })
    .subscribe(res => {
      console.log(res)
      // @ts-ignore
      if( res['status'] == true ) {
        this.router.navigate(['/chat']);
      }
    });
}

}
