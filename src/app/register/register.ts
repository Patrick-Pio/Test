import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html'
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(
    private router: Router,
    private supabaseService: SupabaseService
  ) {}

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