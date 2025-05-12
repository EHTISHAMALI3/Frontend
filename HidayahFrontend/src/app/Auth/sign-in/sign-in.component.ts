import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../Shared/shared.module';
import { NotificationsService } from '../../Shared/services/notifications.service';
import { BrowserStorageService } from '../../Shared/services/browser-storage.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,SharedModule],
  host: {
    'ngSkipHydration': ''
  },
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit{
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private notificationService: NotificationsService,
    private authService:AuthService,
    private spinner: NgxSpinnerService,
    private browserStorageService:BrowserStorageService
  ) {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6), 
          Validators.pattern(/^(?=.*[A-Z])(?=.*[\W_]).{6,}$/) // Requires 1 uppercase and 1 special char
        ]
      ],
      rememberMe: [false]
    });
  }
  ngOnInit(): void {
    const encryptedUsername = this.browserStorageService.SAFE_LOCAL_STORAGE_GET("USER_NAME");
    if (encryptedUsername) {
      const decrypted = this.authService.DECRYPT(encryptedUsername);
      this.loginForm.patchValue({ usernameOrEmail: decrypted, rememberMe: true });
    }
    const token = this.authService.GET_TOKEN();

    if (token && !this.authService.IS_TOKEN_EXPIRED(token)) {
      // User is remembered, redirect to home
      this.authService.REDIRECT_BASED_ON_ROLE()
    } else {
      // Not logged in
      this.router.navigate(['/sign-in']);
    }
  }
  onSubmit() {
    this.spinner.show(); // Show loader before making the request
  
    this.authService.SIGN_IN(this.loginForm.value.usernameOrEmail, this.loginForm.value.password,this.loginForm.value.rememberMe).subscribe({
      next: (response) => {
          if(response.respCode==0){
            this.spinner.hide();
          this.notificationService.error("Invalid Email ID or Password");
          }
          this.router.navigate(['/hidayah/home']);
            this.spinner.hide(); // Hide loader after a delay
            this.notificationService.success(response.respMsg)
      },
      error: (err) => {
        console.log("<------Error----->",err)
        if(err.error.message){
          this.spinner.hide(); // Hide loader after a delay
          this.notificationService.error(err.error.message)
        }
        else{
          this.notificationService.error(err.error.respMsg)
          this.spinner.hide(); // Hide loader after a delay
        }
      }
    });
  }
  
   /**
   * Custom Validator for Username or Email
   */
  //  validateUserInput(control: AbstractControl): ValidationErrors | null {
  //   const value = control.value;
  //   if (!value) return null; // Required validation will handle empty case

  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //  Standard email pattern
  //   const usernameRegex = /^(?=.*[A-Z])(?=.*[\W_]).{4,}$/; // 1 Uppercase + 1 Special Char

  //   if (emailRegex.test(value) || usernameRegex.test(value)) {
  //     return null; // Valid if either email or username format is correct
  //   }

  //   return { invalidUserInput: true }; // ❌ Invalid if neither matches
  // }
}
