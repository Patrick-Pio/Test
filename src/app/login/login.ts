import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private supabaseService: SupabaseService) {}

  async login() {
    const { error } = await this.supabaseService.supabase.auth.signInWithPassword({
      email: this.email,
      password: this.password
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert('Login successful!');
  }
}