import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  forgotPasswordForm!: FormGroup;
  resetPasswordForm!: FormGroup;
  showForgotPassword = false;
  showResetPassword = false;
  isAdmin = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Check if we're in admin section based on current route
    this.isAdmin = this.router.url.includes('/admin');
  }

  ngOnInit() {
    this.initializeForms();
  }

  private initializeForms() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  private passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
 
      if (email === 'admin@example.com' && password === 'admin123') {
      
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('userEmail', email);
        
        this.router.navigate(['/admin/dashboard']);
        this.showSuccessMessage('Login successful!');
      } else if (email === 'user@example.com' && password === 'user123') {
      
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'user');
        localStorage.setItem('userEmail', email);
        
        this.router.navigate(['/user/bookings']);
        this.showSuccessMessage('Login successful!');
      } else {
        this.showErrorMessage('Invalid credentials');
      }
    }
  }

  onForgotPassword() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get('email')?.value;
      
      
      if (email === 'admin@example.com' || email === 'user@example.com') {
        this.showSuccessMessage('Password reset link sent to your email');
        this.showForgotPassword = false;
        this.showResetPassword = true;
      } else {
        this.showErrorMessage('Email not found');
      }
    }
  }

  onResetPassword() {
    if (this.resetPasswordForm.valid) {
      const { newPassword } = this.resetPasswordForm.value;
      
      // Simulate API call to reset password
      // In a real application, you would send this to your backend
      this.showSuccessMessage('Password reset successful!');
      this.showResetPassword = false;
      
      // Clear the login form
      this.loginForm.reset();
    }
  }

  private showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  private showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
} 