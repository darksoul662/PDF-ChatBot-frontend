import { Component } from '@angular/core';

@Component({
  selector: 'app-upload1',
  templateUrl: './upload1.component.html',
  styleUrls: ['./upload1.component.css']
})
export class Upload1Component {
  uploadClass: string = 'upload';
  fileName: string = 'No file selected';

  sleep(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  async startUpload() {
    this.uploadClass = 'upload uploading';
    await this.sleep(3000);
    this.uploadClass = 'upload uploaded';
    await this.sleep(2000);
    this.uploadClass = 'upload uploaded-after';
    await this.sleep(1000);
    this.uploadClass = 'upload';
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileName = input.files[0].name;
      this.startUpload();
    }
  }
}
