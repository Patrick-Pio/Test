import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-showroom',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './showroom.html',
  styleUrls: ['./showroom.css']
})
export class ShowroomComponent {

  cars = [
    {
      name: 'BMW M4',
      price: '₹1,20,00,000',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70'
    },
    {
      name: 'Audi R8',
      price: '₹2,00,00,000',
      image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c'
    }
  ];

  // ✅ ADD THIS (for popup)
  selectedCar: any = null;

  viewDetails(car: any) {
    this.selectedCar = car;
  }

  closeDetails() {
    this.selectedCar = null;
  }

}