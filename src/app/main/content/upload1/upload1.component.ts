import { Component } from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest} from '@angular/common/http';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {Chat} from "../chatt1/chatt1.component";
import {NgxSpinnerService} from "ngx-spinner";

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
  chatHistory: any;
  private typeSelected: string;


  constructor(private http: HttpClient,
              private  router: Router,
              private cookieService: CookieService,
              private spinnerService: NgxSpinnerService, ) {
        this.typeSelected = 'ball-fussion';
    if(this.cookieService.get('access_token') == ''){
      this.router.navigate(['/login']);
    }
    this.getfileList();

  } // Inject HttpClient

  sleep(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  async startUpload(file: File) {
    this.spinnerService.show()
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
      this.spinnerService.hide();
      this.router.navigate(['/chatt1/'+event.body.file_id],);

    }
    });
  }
  openChat(chat: Chat) {
    // this.spinnerService.show();
    this.http.get('http://127.0.0.1:8000/api/restore', { params: { id: this.cookieService.get('id'), file_id: chat.id } }).subscribe((response: any) => {
      // this.spinnerService.hide();
      console.log(response)
      if (response.message != null && response.message.length > 0) {
        this.router.navigate(['/chatt1/'+chat.id],);
      }else{
        this.router.navigate(['/chatt1/'+chat.id],);
        // this.messages = [
        //   [
        //     "Hi",
        //     "Please Ask me a question"
        //   ],
        //   ];
      }
    });

  }
    getfileList() {
    this.http.get('http://127.0.0.1:8000/file?id=' + this.cookieService.get('id')).subscribe((response: any) => {
      console.log(response);
      this.chatHistory = response;
    });
    }

    deleteFile(chat: Chat, event: Event) {
  event.stopPropagation();
  this.http.delete('http://127.0.0.1:8000/file?id=' + chat.id).subscribe((response: any) => {
    let fileIndex = this.chatHistory.findIndex((item: any) => item.id == chat.id);
    this.chatHistory.splice(fileIndex, 1);
    console.log(response);
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
