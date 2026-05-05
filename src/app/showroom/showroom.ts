import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule} from '@angular/router';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-showroom',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './showroom.html',
  styleUrls: ['./showroom.css']
})
export class ShowroomComponent {

  constructor(
    private router: Router,
    private supabaseService: SupabaseService) {}

    cars: any[] = [];

  ngOnInit(): void {
    this.loadCars();
  }

  async loadCars() {
    try {
      const data = await this.supabaseService.getCars();
      console.log('CARS:', data);

      this.cars = data ?? [];   // 👈 IMPORTANT (fallback)
    } catch (err) {
      console.error('ERROR:', err);
      this.cars = [];           // 👈 prevents blank UI issues
    }
  }

  // ✅ Better: handle null safely
  get isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }
  // ✅ (Optional) Navigate to add car page
  goToAddCar() {
    this.router.navigate(['/add-car']);
  }
  goToBookings() {
  this.router.navigate(['/my-bookings']);
}
logout() {
  localStorage.clear();   // removes login data
  this.router.navigate(['/login']);
}
 
} 