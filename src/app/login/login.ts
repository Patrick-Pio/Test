import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
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

  constructor(
    private supabaseService: SupabaseService,
    private router: Router   // ✅ ADD THIS
  ) {}

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

    // ✅ ADD THIS LINE (IMPORTANT)
    this.router.navigate(['/showroom']);
  }
}