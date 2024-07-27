import { Component } from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest} from '@angular/common/http';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-upload1',
  templateUrl: './upload1.component.html',
  styleUrls: ['./upload1.component.css']
})
export class Upload1Component {
  uploadClass: string = 'upload';
  fileName: string = 'No file selected';
  valid = false;
  invalidFile = false;
  selectedFile:File | null = null;

  constructor(private http: HttpClient,
              private  router: Router,
              private cookieService: CookieService ) {
    if(this.cookieService.get('access_token') == ''){
      this.router.navigate(['/login']);
    }

  } // Inject HttpClient

  sleep(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  async startUpload(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);

    const req = new HttpRequest('POST', 'http://localhost:8000/api/FileUploadView?id='+this.cookieService.get("id"), formData, {
      reportProgress: true
    });

    this.http.request(req).subscribe((event: any) => {
      if (event.type === HttpEventType.UploadProgress) {
      // Update UI to show uploading status
      this.uploadClass = 'upload uploading';
    } else if (event.type === HttpEventType.Response) {
      // Update UI to show completion status
      this.uploadClass = 'upload uploaded';
      setTimeout(() => {
        this.uploadClass = 'upload uploaded-after';
      }, 1000);
      this.cookieService.set('file_name',file.name );
      console.log(event)
      console.log(event.body.file_id)
      this.router.navigate(['/chatt1/'+event.body.file_id],);
    }
    });

  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (input.files[0].type !== 'application/pdf') {
        this.invalidFile = true;
        this.valid = false;
        return;
      }
      this.valid = true;
      this.invalidFile = false;
      this.fileName = input.files[0].name;
      this.selectedFile = input.files[0];
    }
  }

  startUploadProcess() {
    if (this.selectedFile) {
      this.startUpload(this.selectedFile);
    }
  }

}
