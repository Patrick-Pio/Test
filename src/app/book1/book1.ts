import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { SupabaseService } from '../supabase.service';
import { ChangeDetectorRef } from '@angular/core';

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
  userId: string | null = null;

  errorMessage: string = '';
  infoMessage: string = '';

  timeSlots: string[] = [
    '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00'
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private supabaseService: SupabaseService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.carModel = params['car'] || 'Unknown Car';
    });

    const { data: { session } } = await this.supabaseService.supabase.auth.getSession();

    if (!session) {
      this.infoMessage = 'Session not found. Please log in again.';
      this.cdr.detectChanges();
      setTimeout(() => this.router.navigate(['/login']), 2500);
      return;
    }

    this.userId = session.user.id;
  }

  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  async onSubmit() {
    if (this.isSubmitting) return;

    this.errorMessage = '';
    this.infoMessage = '';
    this.isSubmitting = true;

    try {
      if (!this.userId) throw new Error('User not logged in.');

      const bookingData = {
        user_id: this.userId,
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
        .upsert([bookingData], { onConflict: 'user_id,car_name,date' });

      if (error) throw error;

      this.submitted = true;
      this.cdr.detectChanges();

    } catch (err: any) {
      this.errorMessage = err.message || 'Something went wrong. Please try again.';
      this.cdr.detectChanges();
    } finally {
      this.isSubmitting = false;
    }
  }

  goBack() {
    this.router.navigate(['/showroom']);
  }
}