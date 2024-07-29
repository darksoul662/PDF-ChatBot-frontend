import {Component, OnInit} from '@angular/core';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';
import {AuthenticationService} from "../authentication.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { CookieService } from 'ngx-cookie-service';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {subscribeOn} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  login_error: boolean = false;
  error_msg: string = "";

  constructor(private formBuilder: FormBuilder,
              private loginService: AuthenticationService,
              private cookieService: CookieService,
              private router: Router,
              private toastr: ToastrService,
  ) {
    if(this.cookieService.get('access_token') != ''){
      this.router.navigate(['/upload']);
    }

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log("on submitted")
    if (this.loginForm.invalid) {
      return;
    }
    console.log("after validations")
    this.loginService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe((data : any) => {
      console.log(data)
      if(data['status'] == true){
        if(data['data']['is_blocked'] == true){
          this.login_error = true;
          this.error_msg = "User is blocked";
          return;
        }
        this.cookieService.set('id', data['data']['id']);
        this.cookieService.set('access_token', data['data']['access_token']);
        this.cookieService.set('refresh_token', data['data']['refresh_token']);
        this.cookieService.set('name', data['data']['name']);
        this.cookieService.set('email', data['data']['email']);
        this.cookieService.set('is_admin', data['data']['is_admin']);
        localStorage.setItem('access_token', data['data']['access_token']);
        // this.toastr.success('Login Successful');
        if(data['data']['is_admin'] == true){
          this.router.navigate(['/admin']);
        }else{
          this.router.navigate(['/upload']);
        }
      }else {
        this.login_error = true;
        this.error_msg = "Invalid Credentials";
      }
    });
  }

  redirectRegister() {
    this.router.navigate(['/register']);
  }


  protected readonly subscribeOn = subscribeOn;
}
