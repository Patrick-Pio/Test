import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Car3dViewerComponent } from '../car3d-viewer/car3d-viewer';

@Component({
  selector: 'app-car-view2',
  standalone: true,
  imports: [CommonModule, RouterModule, Car3dViewerComponent],
  templateUrl: './car-view2.html',
  styleUrls: ['./car-view2.css']
})
export class CarViewComponent2 {

  constructor(private router: Router) {}

  goToBooking() {
    this.router.navigate(['/book1'], {
      queryParams: { car: 'MCL39 F1' }
    });
  }

  goBack() {
    this.router.navigate(['/showroom']);
  }
}