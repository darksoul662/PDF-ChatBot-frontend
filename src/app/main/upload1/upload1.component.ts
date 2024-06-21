import { Component } from '@angular/core';

@Component({
  selector: 'app-upload1',
  templateUrl: './upload1.component.html',
  styleUrl: './upload1.component.css'
})
export class Upload1Component {





  uploadClass: string = 'upload';

  sleep(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  async startUpload() {
    this.uploadClass = 'upload uploading';
    await this.sleep(3000);
    this.uploadClass = 'upload uploaded';
    await this.sleep(2000);
    this.uploadClass = 'upload';
    this.uploadClass = 'upload uploaded-after';
    await this.sleep(1000);
    this.uploadClass = 'upload';
  }
}
