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

  constructor(
    private router: Router,
  private supabaseService: SupabaseService) {}

  goBack() {
    this.router.navigate(['/showroom']);
  }

  async addCar() {

    if (
      !this.car.name ||
      !this.car.price ||
      !this.car.engine ||
      !this.car.power ||
      !this.car.top_speed ||
      !this.car.acceleration ||
      !this.car.fuel_type ||
      !this.car.transmission ||
      !this.car.description ||
      !this.car.image_url ||
      !this.car.model_path
    ) {
      alert('Please fill all fields');
      return;
    }

    const { error } = await this.supabaseService.supabase 
      .from('cars')
      .insert([this.car]);

    if (error) {
      console.error('SUPABASE ERROR:', error);
      alert(JSON.stringify(error));
      alert('Failed to add car');
      return;
    }

    alert('Car added successfully!');

    this.router.navigate(['/showroom']);
  }
}