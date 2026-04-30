import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../supabase.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-bookings.html',
  styleUrls: ['./my-bookings.css']
})
export class MyBookingsComponent implements OnInit {

  bookings: any[] = [];
  loading = true;

 constructor(
  private supabaseService: SupabaseService,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit() {
    this.getBookings();
  }

  async getBookings() {
  try {
    this.loading = true;

    const { data: userData, error: userError } =
      await this.supabaseService.supabase.auth.getUser();

    const user = userData?.user;

    if (!user) {
      this.loading = false;
      return;
    }

    const { data, error } = await this.supabaseService.supabase
      .from('bookings')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error(error);
      this.loading = false;
      return;
    }

    // ✅ THIS IS WHERE data EXISTS
    this.bookings = data || [];

    this.loading = false;

    this.cdr.detectChanges();

  } catch (err) {
    console.error(err);
    this.loading = false;
  }
}

  async cancelBooking(id: string) {
    const confirmDelete = confirm("Cancel this booking?");
    if (!confirmDelete) return;

    const { error } = await this.supabaseService.supabase
      .from('bookings')
      .delete()
      .eq('id', id);

    if (!error) {
      this.getBookings(); // refresh list
    }
  }
}