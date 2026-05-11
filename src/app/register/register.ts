import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  email = '';
  password = '';
  showPassword = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private supabaseService: SupabaseService,
    private cdr: ChangeDetectorRef
  ) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  async register() {
    this.successMessage = '';
    this.errorMessage = '';

    const { error } = await this.supabaseService.supabase.auth.signUp({
  email: this.email,
  password: this.password,
  options: {
    emailRedirectTo: 'https://test-alpha-rose-37.vercel.app'
  }
});

    if (error) {
      this.errorMessage = error.message;
      this.cdr.detectChanges();
      return;
    }

    this.successMessage = 'Registered successfully! Redirecting to login...';
    this.cdr.detectChanges();

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2500);
  }
}