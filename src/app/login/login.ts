import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { SupabaseService } from '../supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private supabaseService: SupabaseService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  async login() {
    this.successMessage = '';
    this.errorMessage = '';

    const { data, error } = await this.supabaseService.supabase.auth.signInWithPassword({
      email: this.email,
      password: this.password
    });

    if (error) {
      this.errorMessage = error.message;
      this.cdr.detectChanges();
      return;
    }

    const user = data.user;

    const { data: profile, error: profileError } = await this.supabaseService.supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error(profileError);
      this.errorMessage = 'Error fetching user role';
      this.cdr.detectChanges();
      return;
    }

    const role = profile?.role || 'user';
    localStorage.setItem('role', role);

    this.successMessage = 'Login successful! Redirecting...';
    this.cdr.detectChanges();

    setTimeout(() => {
      this.router.navigate(['/showroom']);
    }, 1200);
  }
}