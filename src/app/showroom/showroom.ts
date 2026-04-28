import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showroom',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './showroom.html',
  styleUrls: ['./showroom.css']
})
export class ShowroomComponent {

  constructor(private router: Router) {}

  cars = [
    {
      name: 'Ferrari 288 GTO',
      price: '₹1,20,00,000',
      image: 'https://images.squarespace-cdn.com/content/v1/5caed8960cf57d49530e8c60/353917e2-f8e9-45e6-8f3f-11a0a0bd6a11/01.jpg?format=2500w'
    },
    {
      name: 'Audi R8',
      price: '₹2,00,00,000',
      image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c'
    }
  ];

  // ✅ Better: handle null safely
  get isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  // ✅ Better: type safety (optional but good practice)
  viewDetails(car: { name: string }) {
    this.router.navigate(['/car', car.name]);
  }
  // ✅ (Optional) Navigate to add car page
  goToAddCar() {
    this.router.navigate(['/add-car']);
  }
}