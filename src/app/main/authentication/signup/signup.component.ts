import {Component, OnInit} from '@angular/core';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../authentication.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  faFacebookF = faFacebookF;
  faTwitter = faTwitter;
  faGoogle = faGoogle;
   passwordMatched: boolean = false;

  constructor(private cookieService: CookieService,
              private router: Router,
              private formBuilder: FormBuilder,
              private registerService: AuthenticationService,
              private toastr: ToastrService,
  ) {
    if(this.cookieService.get('access_token') != ''){
      this.router.navigate(['/dashboard']);
    }
  }
  registerForm!: FormGroup;
  login_error : boolean= false;
  error_msg : string = '';
  is_success : boolean = false;
  success_msg : string = '';

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit() {
    console.log("onsubmit invoked")
    if(this.registerForm.value.password != this.registerForm.value.confirmPassword){
      this.login_error = true;
      this.error_msg="Password and Confirm Password should be same";
      return;
    }
    if (this.registerForm.invalid) {
      return;
    }
    const payload={
      "name":this.registerForm.value.name,
      "email":this.registerForm.value.email,
      "password":this.registerForm.value.password,
    }
    console.log(this.registerService.register(payload).subscribe(data=>
    {
      console.log(data)
      // @ts-ignore
      if(data['status']==true){
        this.login_error=false;
        this.is_success=true;
        this.success_msg='Registration Successful';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 5000);
      }else{
        this.login_error = true;
        // @ts-ignore
        if('email' in data['message']) {
          // @ts-ignore
          this.error_msg= ' Email already exists';
        }else{
           this.error_msg= 'Registration Failed';
        }
      }
    }
    ));
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
