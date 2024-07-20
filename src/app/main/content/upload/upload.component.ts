import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  selectedFile: any = null;

  constructor(private http: HttpClient) { }

  onFileSelected(event:any) {
    this.selectedFile = <File>event.target.files[0];
  }

  onSubmit(event: Event) {
  event.preventDefault();
  const formData = new FormData();
  formData.append('file', this.selectedFile, this.selectedFile.name);
  console.log(formData)
  this.http.post('http://localhost:8000/api/FileUploadView/', formData)
    .subscribe(res => {
      console.log(res);
    });
}

}
