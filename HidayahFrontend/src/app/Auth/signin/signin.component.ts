import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit{
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private router:Router,private toastr: ToastrService,private authService:AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6), 
          // Validators.pattern(/^(?=.*[A-Z])(?=.*[\W_]).{6,}$/) // Requires 1 uppercase and 1 special char
        ]
      ],
      rememberMe: [false]
    });
  }
  ngOnInit(): void {
    
  }
  onSubmit() {
    this.authService.signin(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => {
        this.router.navigate(['/hidayah/home'])
      },
      error: (err) => console.error('Login failed', err),
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
