import { Component } from '@angular/core';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  faFacebookF = faFacebookF;
  faTwitter = faTwitter;
  faGoogle = faGoogle;

}
