import { Component } from '@angular/core';

@Component({
  selector: 'app-chatt1',
  templateUrl: './chatt1.component.html',
  styleUrl: './chatt1.component.css'
})
export class Chatt1Component {
  messages = [
    { text: 'Hello! How can I assist you today?', sent: false }
  ];
  newMessage = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ text: this.newMessage, sent: true });
      this.newMessage = '';
      // Simulate a bot response
      setTimeout(() => {
        this.messages.push({ text: 'This is a response from the bot.', sent: false });
      }, 1000);
    }
  }
}
