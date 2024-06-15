import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  form: FormGroup = new FormGroup({})
  result: any={};

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.form = this.fb.group({
      query: ['']
    });
  }

  onSubmit() {
      const headers = new HttpHeaders({
    // 'Content-Type': 'multipart/form-data; boundary=--------------------------254709419031316058436862',
    'Content-Length': '55051',
    'User-Agent': 'PostmanRuntime/7.39.0',
    'Accept': '*/*',
    // 'Postman-Token': '6b699119-cd9b-4737-82e1-8d491026ba08',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive'
  });
    // @ts-ignore
    const query = this.form.get('query')?.value;
    let payload={
      "message": query,
    }
    this.http.post(`http://127.0.0.1:8000/api/conversation/`,payload,{headers}).subscribe(res => {
      this.result = res;
    });
  }

}
