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
      image: 'https://images.squarespace-cdn.com/content/v1/5caed8960cf57d49530e8c60/353917e2-f8e9-45e6-8f3f-11a0a0bd6a11/01.jpg?format=2500w',
      route: '/car-view1'
    },
    {
      name: 'MCL39 F1',
      price: '₹30,00,00,000',
      image: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/fom-website/2023/McLaren/Formula%201%20header%20template%20(35).webp',
      route: '/car-view2'
    }
  ];

  // ✅ Better: handle null safely
  get isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  // ✅ Better: type safety (optional but good practice)
  viewDetails(route: string) {
  this.router.navigateByUrl(route);
  }
  // ✅ (Optional) Navigate to add car page
  goToAddCar() {
    this.router.navigate(['/add-car']);
  }
  goToBookings() {
  this.router.navigate(['/my-bookings']);
}
logout() {
  localStorage.clear();   // removes login data
  this.router.navigate(['/login']);
}
 
} 