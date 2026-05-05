import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
    engine: '',
    power: '',
    topSpeed: '',
    acceleration: '',
    fuelType: '',
    transmission: '',
    description: '',
    imageUrl: ''
  };

  constructor(private router: Router) {}

  addCar() {
    if (
      !this.car.name ||
      !this.car.engine ||
      !this.car.power ||
      !this.car.topSpeed ||
      !this.car.acceleration ||
      !this.car.fuelType ||
      !this.car.transmission ||
      !this.car.description ||
      !this.car.imageUrl
    ) {
      alert('Please fill all fields');
      return;
    }

    console.log('Added Car:', this.car);
    alert('Car added successfully!');
    this.router.navigate(['/showroom']);
  }
}