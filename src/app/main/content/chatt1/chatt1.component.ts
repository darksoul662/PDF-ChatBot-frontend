import {Component, ElementRef, NgIterable, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {CookieService} from "ngx-cookie-service";
  export interface Message {
     text: string;
     isOwner: boolean;
  }

@Component({
  selector: 'app-chatt1',
  templateUrl: './chatt1.component.html',
  styleUrl: './chatt1.component.scss'
})
export class Chatt1Component {
  messages =[
    [
        "hi",
        " Hello! Based on the information provided in the invoice, this is a B2C (business-to-consumer) transaction involving a restaurant service with the HSN code 996331, which is exempt from reverse charges, taking place in Telangana, India. The invoice total is INR 525 (Five Hundred and Twenty Five Rupees), with taxes amounting to INR 25 (Twenty Five Rupees). The restaurant is named \"City Diamond Haleem\", and the customer's address is given as \"490/40/1, Tappachabutra Rd, Jagadamba Nagar, Asif Nagar, Hyderabad, Telangana, India\". Swiggy Limited, with GSTIN 36AAFCB7707D1ZV, issued the invoice on behalf of the unregistered restaurant."
    ],
    [
        "hi",
        " The name of the restaurant mentioned in the invoice is City Diamond Haleem and its location is Inside Jbs Bus Station Gandhi Nagar, Nehru Nagar Colony, West Marredpally, Secunderabad, Telangana, India."
    ],
    [
        "hi",
        " The City Diamond Haleem restaurant is located Inside Jbs Bus Station Gandhi Nagar, Nehru Nagar Colony, West Marredpally, Secunderabad, Telangana, India."
    ],
    [
        "hi",
        " The City Diamond Haleem restaurant is located inside Jbs Bus Station, Gandhi Nagar, Nehru Nagar Colony, West Marredpally, Secunderabad, Telangana, India."
    ],
    [
        "hi",
        " The City Diamond Haleem restaurant is located inside Jbs Bus Station, Gandhi Nagar, Nehru Nagar Colony, West Marredpally, Secunderabad, Telangana, India."
    ],
    [
        "hi",
        " The City Diamond Haleem restaurant is located inside JBS Bus Station, Gandhi Nagar, Nehru Nagar Colony, West Marredpally, Secunderabad, Telangana, India."
    ],
    [
        "hi",
        " The City Diamond Haleem restaurant is located Inside Jbs Bus Station Gandhi Nagar, Nehru Nagar Colony, West Marredpally, Secunderabad, Telangana, India."
    ]
];
  newMessage = '';
  typeSelected: string = "";

    @ViewChild('messagesContainer') private messagesContainer: ElementRef | undefined;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  private scrollToBottom(): void {
    try {
      // @ts-ignore
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  constructor(private http: HttpClient,
              private  router: Router,
              private spinnerService: NgxSpinnerService,
              protected cookieService: CookieService) {
        this.typeSelected = 'ball-fussion';
  } // Inject HttpClient

  sendMessage() {
    this.spinnerService.show();

    if (this.newMessage.trim()) {
      this.http.post('http://127.0.0.1:8000/api/conversation/', { message: this.newMessage }).subscribe((response: any) => {
        this.messages = response.message
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

  startNewChat(){
    this.router.navigate(['/upload1'])
  }
}
