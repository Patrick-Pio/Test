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
  confirmCancelId: string | null = null;
  errorMessage: string = '';

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

      const { data: userData } =
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

      this.bookings = data || [];
      this.loading = false;
      this.cdr.detectChanges();

    } catch (err) {
      console.error(err);
      this.loading = false;
    }
  }

  openCancelConfirm(id: string) {
    this.confirmCancelId = id;
    this.errorMessage = '';
    this.cdr.detectChanges();
  }

  dismissCancel() {
    this.confirmCancelId = null;
    this.cdr.detectChanges();
  }

  async confirmCancel() {
    if (!this.confirmCancelId) return;

    const id = this.confirmCancelId;
    this.confirmCancelId = null;

    const { error } = await this.supabaseService.supabase
      .from('bookings')
      .delete()
      .eq('id', id);

    if (error) {
      this.errorMessage = 'Failed to cancel booking. Please try again.';
    } else {
      this.errorMessage = '';
      this.getBookings();
    }

    this.cdr.detectChanges();
  }
}