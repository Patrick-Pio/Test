import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { SupabaseService } from '../supabase.service'; // adjust path

@Component({
  selector: 'app-book1',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './book1.html',
  styleUrl: './book1.css',
})
export class Book1 implements OnInit {
  carModel: string = 'Ferrari 288 GTO';
  name: string = '';
  phone: string = '';
  email: string = '';
  date: string = '';
  timeSlot: string = '';
  notes: string = '';
  submitted: boolean = false;

  timeSlots: string[] = [
  '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00'
];

 constructor(
  private router: Router,
  private route: ActivatedRoute,
  private supabaseService: SupabaseService
) {}

  ngOnInit() {
    // Auto-fill car from route param if available
    const carFromRoute = this.route.snapshot.queryParams['car'];
    if (carFromRoute) {
      this.carModel = carFromRoute;
    }
  }

  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  async onSubmit() {
  if (!this.name || !this.phone || !this.email || !this.date || !this.timeSlot) {
    alert('Please fill in all required fields.');
    return;
  }

  const user = await this.supabaseService.supabase.auth.getUser();
  console.log("USER:", user);

  const bookingData = {
    user_id: user.data.user?.id,
    car_name: this.carModel,
    full_name: this.name,
    phone: this.phone,
    email: this.email,
    date: this.date,
    time_slot: this.timeSlot,
    notes: this.notes
  };

  console.log("SENDING:", bookingData);

  const { data, error } = await this.supabaseService.supabase
    .from('bookings')
    .insert([bookingData]);

  console.log("RESPONSE:", data);
  console.log("ERROR:", error);

  if (error) {
    alert("Error: " + error.message);
    return;
  }

  this.submitted = true;
}

  goBack() {
    this.router.navigate(['/showroom']);
  }
}