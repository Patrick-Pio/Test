import { Component } from '@angular/core';
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

  constructor(
    private router: Router,
    private supabaseService: SupabaseService
  ) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  async register() {
    const { error } = await this.supabaseService.supabase.auth.signUp({
      email: this.email,
      password: this.password
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert('Registered successfully!');
    this.router.navigate(['/login']);
  }
}