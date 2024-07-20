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
      this.toastr.clear(); // Clear any existing toasts
      this.toastr.error("Password and Confirm Password doesn't match");
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
        this.toastr.success('Registration Successful');
        this.router.navigate(['/login']);
      }else{
        // @ts-ignore
        if('email' in data['message']) {
          // @ts-ignore
          this.toastr.clear(); // Clear any existing toasts
          this.toastr.error( ' Email already exists');
        }else{
          this.toastr.error('Registration Failed');
        }
      }
    }
    ));
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }





}
