import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-book1',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './book1.html',
  styleUrl: './book1.css',
})
export class Book1 implements OnInit {
  isSubmitting: boolean = false;
  carModel: string = '';
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
    this.route.queryParams.subscribe(params => {
      this.carModel = params['car'] || 'Unknown Car';
    });
  }

  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  async onSubmit() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;

    if (!this.name || !this.phone || !this.email || !this.date || !this.timeSlot) {
      alert('Please fill in all required fields.');
      this.isSubmitting = false;
      return;
    }

    const user = await this.supabaseService.supabase.auth.getUser();

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

    const { data, error } = await this.supabaseService.supabase
      .from('bookings')
      .insert([bookingData]);

    if (error) {
      if (error.message.includes('unique_user_car_per_day')) {
        alert('You already have a booking for this car on that day. Please choose a different date.');
      } else {
        alert('Error: ' + error.message);
      }
      this.isSubmitting = false;
      return;
    }

    this.submitted = true;
    this.isSubmitting = false;
  }

  goBack() {
    this.router.navigate(['/showroom']);
  }
}