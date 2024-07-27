import {Component, OnInit} from '@angular/core';
import {AdminService} from "../admin.service";
import {User} from "../admin.component";
import {MatTableDataSource} from "@angular/material/table";
import { saveAs } from 'file-saver';

export interface File{
  id: number;
  file_name: string;
  uploaded_at: string;
  user_id: number;
  username: string;
}

@Component({
  selector: 'app-admin-file-managent',
  templateUrl: './admin-file-managent.component.html',
  styleUrl: './admin-file-managent.component.css'
})
export class AdminFileManagentComponent implements OnInit {

  fileDetails:File[] = []
  fileDetailsDS: MatTableDataSource<File>= new MatTableDataSource<File>();
  displayedColumns: string[] = ['id', 'file_name','username', 'uploaded_at', 'user_id','download','delete'];

  constructor(private adminService: AdminService) {
    this.adminService.getFullFileDetails().subscribe((data) => {
      // @ts-ignore
      if(data && data['status']==true){
        // @ts-ignore
        this.fileDetailsDS = new MatTableDataSource<File>(data['data']);
      }
      console.log(this.fileDetails)
    });
  }

  downloadFile(file: File) {
  this.adminService.downloadFile(file.id).subscribe((data: Blob) => {
    saveAs(data, file.file_name);
  });
}

  deleteFile(file: File){
    console.log(file)
    this.adminService.deleteFile(file.id).subscribe((data) => {
      // @ts-ignore
      if(data && data['status']==true){
          this.fileDetailsDS.data = this.fileDetailsDS.data.filter((u) => u.id != file.id);
      }

    });
  }

applyFilter(event: any) {
  const filterValue = event.target.value.trim().toLowerCase();

  this.fileDetailsDS.filterPredicate = (data: any, filter: string) => {
    // Convert the data object to an array of its values
    const dataValues = Object.values(data);

    // Check if any value includes the filter string
    return dataValues.some(value => String(value).toLowerCase().includes(filter));
  };

  this.fileDetailsDS.filter = filterValue;
}

  convertToHumanReadable(timestamp:any) {
    // Create a Date object from the timestamp
    let date = new Date(timestamp);

    // Adjust to GMT-5
    date.setHours(date.getHours() - 5);

    // Format the date and time
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

  ngOnInit(): void {

  }


}
