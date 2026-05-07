import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-car.html',
  styleUrl: './add-car.css'
})
export class AddCarComponent {

  car = {
    name: '',
    price: '',
    engine: '',
    power: '',
    top_speed: '',
    acceleration: '',
    fuel_type: '',
    transmission: '',
    description: '',
    image_url: '',
    model_path: ''
  };

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private supabaseService: SupabaseService) {}

  goBack() {
    this.router.navigate(['/showroom']);
  }

  async addCar() {
    this.errorMessage = '';

    const allFilled = Object.values(this.car).every(v => v.trim() !== '');

    if (!allFilled) {
      this.errorMessage = 'Please fill in all fields before submitting.';
      return;
    }

    this.isLoading = true;

    const { error } = await this.supabaseService.supabase
      .from('cars')
      .insert([this.car]);

    this.isLoading = false;

    if (error) {
      console.error('SUPABASE ERROR:', error);
      this.errorMessage = 'Failed to add car. Please try again.';
      return;
    }

    this.router.navigate(['/showroom'], { queryParams: { added: 'true' } });
  }
}