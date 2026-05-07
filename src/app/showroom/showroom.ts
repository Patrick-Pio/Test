import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-showroom',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './showroom.html',
  styleUrls: ['./showroom.css']
})
export class ShowroomComponent implements OnInit {

  cars: any[] = [];
  loading = true;
  carAdded = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private supabaseService: SupabaseService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['added'] === 'true') {
        this.carAdded = true;
        this.router.navigate([], { queryParams: {}, replaceUrl: true });
        setTimeout(() => {
          this.carAdded = false;
          this.cdr.detectChanges();
        }, 4000);
      }
    });

    await this.loadCars();
  }

  async loadCars() {
    try {
      const { data, error } = await this.supabaseService.supabase
        .from('cars')
        .select('name, price, image_url')
        .order('created_at', { ascending: true });

      if (error) throw error;

      this.ngZone.run(() => {
        this.cars = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      });

    } catch (err) {
      console.error('Failed to load cars:', err);
      this.ngZone.run(() => {
        this.loading = false;
        this.cdr.detectChanges();
      });
    }
  }

  get isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  viewDetails(carName: string) {
    this.router.navigate(['/car', carName]);
  }

  goToAddCar() {
    this.router.navigate(['/add-car']);
  }

  goToBookings() {
    this.router.navigate(['/my-bookings']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}