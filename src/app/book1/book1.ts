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
    alert("Session not found. Please login again.");
    this.router.navigate(['/login']);
    return;
  }

  this.userId = session.user.id;

  console.log("User ID:", this.userId); // ✅ should NOT be null now
}

  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

 async onSubmit() {
  console.log("STEP 0: SUBMIT CALLED");

  if (this.isSubmitting) return;
  this.isSubmitting = true;

  try {
    console.log("STEP 1: Checking user");

    if (!this.userId) {
      console.log("USER ID IS NULL ❌");
      throw new Error("User not logged in");
    }

    console.log("STEP 2: Preparing data");

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

    console.log("STEP 3: Before upsert", bookingData);

    const { data, error } = await this.supabaseService.supabase
      .from('bookings')
      .upsert([bookingData], {
  onConflict: 'user_id,car_name,date'
});

    console.log("STEP 4: After upsert", data, error);

    if (error) throw error;

    console.log("STEP 5: Success");
    this.submitted = true;
    this.cdr.detectChanges();

  } catch (err: any) {
    console.error("STEP ERROR:", err);
    alert(err.message || "Error");
  } finally {
    console.log("STEP 6: Finally");
    this.isSubmitting = false;
  }
}

  goBack() {
    this.router.navigate(['/showroom']);
  }
}