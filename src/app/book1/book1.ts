import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-book1',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './book1.html',
  styleUrl: './book1.css',
})
export class Book1 implements OnInit {
  carModel: string = 'Ferrari 288 GTO';
  name: string = '';
  phone: string = '';
  email: string = '';
  date: string = '';
  timeSlot: string = '';
  notes: string = '';
  submitted: boolean = false;

  timeSlots: string[] = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM',
    '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Auto-fill car from route param if available
    const carFromRoute = this.route.snapshot.queryParams['car'];
    if (carFromRoute) {
      this.carModel = carFromRoute;
    }
  }

  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  onSubmit() {
    if (!this.name || !this.phone || !this.email || !this.date || !this.timeSlot) {
      alert('Please fill in all required fields.');
      return;
    }
    this.submitted = true;
  }

  goBack() {
    this.router.navigate(['/car-view1']);
  }
}