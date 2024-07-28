import { Component, ElementRef, NgIterable, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CookieService } from "ngx-cookie-service";
import {ToastrService} from "ngx-toastr";
import {timeout} from "rxjs";

export interface Message {
  text: string;
  isOwner: boolean;
}

export interface Chat {
  id: number;
  file_name: string;
  file: string;
  user_id: number;
  uploaded_at: string;
}

@Component({
  selector: 'app-chatt1',
  templateUrl: './chatt1.component.html',
  styleUrls: ['./chatt1.component.scss']
})
export class Chatt1Component implements OnInit {
  messages = [
    [
      "Hi",
      "Please Ask me a question"
    ],
  ];
  newMessage = '';
  typeSelected: string = "";
  chatHistory: Chat[] = [];
  showButtons = false;
  file_id =  -1;
  filename = '';
  chatBeingEdited: Chat | null = null;


  @ViewChild('messagesContainer') private messagesContainer: ElementRef | undefined;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private spinnerService: NgxSpinnerService,
              protected cookieService: CookieService,
              ) {
    if(this.cookieService.get('access_token') == ''){
      this.router.navigate(['/login']);
    }
    this.typeSelected = 'ball-fussion';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
     // @ts-ignore
      this.file_id = this.route.snapshot.paramMap.get('id');
    });
    if(this.file_id == null){
      this.startNewChat();
    }
    this.getfileList();

  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer!.nativeElement.scrollTop = this.messagesContainer!.nativeElement.scrollHeight;
    } catch (err) { }
  }

  sendMessage() {
    this.spinnerService.show();

    if (this.newMessage.trim()) {
      this.http.post('http://127.0.0.1:8000/api/conversation?id='+this.cookieService.get('id')+"&file_id="+this.file_id, { message: this.newMessage }).subscribe((response: any) => {
        this.messages = response.message;
        this.spinnerService.hide();
      });
    }

    this.newMessage = '';
  }

  downloadConversation() {
    const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
    let y = 20; // Initialize y coordinate (start a bit lower to accommodate header)

    this.addHeader(pdf, this.cookieService.get('file_name'), this.cookieService.get('name'), y);
    y += 20; // Add some space after the header

    const pageHeight = pdf.internal.pageSize.height - 10; // A4 size page height in mm, less margin

    this.messages.forEach((message) => {
      y = this.addTextToPDF(pdf, `User: ${message[0]}`, 10, y, pageHeight, 'bold');
      y = this.addTextToPDF(pdf, `System: ${message[1]}`, 10, y, pageHeight, 'bold');
      y += 5; // Add extra space between messages
    });

    pdf.save(`${this.cookieService.get('file_name')}.pdf`); // Save generated PDF with file name
  }

  private addHeader(pdf: jsPDF, fileName: string, username: string, y: number) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.text(fileName, 10, y); // Add file name at top
    pdf.setFontSize(12);
    pdf.text(`User: ${username}`, 10, y + 10); // Add username below the file name
    pdf.setLineWidth(0.5);
    pdf.line(10, y + 15, 200, y + 15); // Add a horizontal line below the header
  }

  private addTextToPDF(pdf: jsPDF, text: string, x: number, y: number, pageHeight: number, fontStyle: 'bold' | 'normal'): number {
    const textLines = pdf.splitTextToSize(text, 180); // Split text into lines fitting the page width

    pdf.setFont('helvetica', fontStyle);
    pdf.setFontSize(12);

    textLines.forEach((line: string | string[]) => {
      if (y + 10 > pageHeight) {
        pdf.addPage();
        y = 20; // Reset y coordinate for new page and leave space for header
        this.addHeader(pdf, this.cookieService.get('file_name'), this.cookieService.get('name'), y - 10); // Add header to new page
      }
      pdf.text(line, x, y); // Add text line at position (x, y)
      y += 10; // Move y coordinate for next line
    });

    return y;
  }

  getfileList() {
    this.http.get('http://127.0.0.1:8000/file?id=' + this.cookieService.get('id')).subscribe((response: any) => {
      let chatindex = response.findIndex((item: any) => item.id == this.file_id);
      this.filename = response[chatindex].file_name;
      this.chatHistory = response;
          this.openChat({id: this.file_id, file_name: '', file: '', user_id: 0, uploaded_at: ''})
      return response;
    });
  }

  startNewChat() {
    this.router.navigate(['/upload1']);
  }

  openChat(chat: Chat) {
    this.spinnerService.show();
    this.http.get('http://127.0.0.1:8000/api/restore', { params: { id: this.cookieService.get('id'), file_id: chat.id } }).subscribe((response: any) => {
      this.file_id = chat.id;
      let chatindex = this.chatHistory.findIndex((item: any) => item.id == this.file_id);
      console.log(response)
      console.log(this.chatHistory)
      this.filename = this.chatHistory[chatindex].file_name;
      console.log(response)
      this.spinnerService.hide();
      if (response.message != null && response.message.length > 0) {
        this.messages = response.message;
      }else{
        this.messages = [
          [
            "Hi",
            "Please Ask me a question"
          ],
          ];
      }
    });
    console.log('Open chat:', chat);
  }

  onMouseEnter(event: any) {
    this.showButtons = true;
  }

  onMouseLeave(event: any) {
    this.showButtons = false;
  }

deleteFile(chat: Chat, event: Event) {
  event.stopPropagation();
  this.http.delete('http://127.0.0.1:8000/file?id=' + chat.id).subscribe((response: any) => {
    console.log(response);
  });
  }
  startEditing(chat: Chat, event: Event) {
  event.stopPropagation();
  this.chatBeingEdited = chat;
  }
  finishEditing(chat: Chat, event: Event) {
  event.stopPropagation();
  // Save changes to chat.file_name here...
  this.chatBeingEdited = null;
}
}
