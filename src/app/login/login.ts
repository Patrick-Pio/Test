import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async login() {
    const { data, error } = await this.supabaseService.supabase.auth.signInWithPassword({
      email: this.email,
      password: this.password
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    // ✅ Fetch role from profiles table
    const { data: profile, error: profileError } = await this.supabaseService.supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error(profileError);
      alert('Error fetching user role');
      return;
    }

    const role = profile?.role || 'user';

    // ✅ Store role locally
    localStorage.setItem('role', role);

    console.log('User role:', role);

    alert('Login successful!');

    // ✅ Navigate
    this.router.navigate(['/showroom']);
  }
}