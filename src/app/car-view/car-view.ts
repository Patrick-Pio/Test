import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NgZone, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Car3dViewerComponent } from '../car3d-viewer/car3d-viewer';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-car-view',
  standalone: true,
  imports: [CommonModule, RouterModule, Car3dViewerComponent],
  templateUrl: './car-view.html',
  styleUrls: ['./car-view.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarViewComponent implements OnInit {
  loading = true;
  carName: string = '';
  engine: string = '';
  power: string = '';
  topSpeed: string = '';
  acceleration: string = '';
  fuelType: string = '';
  transmission: string = '';
  description: string = '';
  modelPath: string = '';
  price: string = '';       // ✅ Added
  tagline: string = '';     // ✅ Added

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supabaseService: SupabaseService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      const raw = params['name'];
      const name = decodeURIComponent(decodeURIComponent(raw));
      console.log('Car name:', name);
      if (name) await this.loadCar(name);
    });
  }

  async loadCar(name: string) {
    this.loading = true;
    try {
      const { data, error } = await this.supabaseService.supabase
        .from('cars')
        .select('*')
        .eq('name', name)
        .single();

      if (error) throw error;

      this.ngZone.run(() => {
        if (data) {
          this.carName      = data.name;
          this.engine       = data.engine;
          this.power        = data.power;
          this.topSpeed     = data.top_speed;
          this.acceleration = data.acceleration;
          this.fuelType     = data.fuel_type;
          this.transmission = data.transmission;
          this.description  = data.description;
          this.modelPath    = data.model_path || 'assets/models/car1.glb';
          this.price        = data.price || '';        // ✅ Added
          this.tagline      = data.tagline || '';      // ✅ Added
          this.loading      = false;
          this.cdr.detectChanges();
        }
      });
    } catch (err) {
      console.error('Failed to load car:', err);
      this.ngZone.run(() => {
        this.loading = false;
        this.cdr.detectChanges();
      });
    }
  }

  goBack() {
    this.router.navigate(['/showroom']);
  }

  bookTestDrive() {
    this.router.navigate(['/book1'], {
      queryParams: { car: this.carName }
    });
  }
}