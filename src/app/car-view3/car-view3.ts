import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Car3dViewerComponent } from '../car3d-viewer/car3d-viewer';

@Component({
  selector: 'app-car-view3',
  standalone: true,
  imports: [CommonModule, RouterModule, Car3dViewerComponent],
  templateUrl: './car-view3.html',
  styleUrls: ['./car-view3.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarViewComponent3 {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}
  goBack() {
  this.router.navigate(['/showroom']); 
}

  goToBooking() {
    this.router.navigate(['/book1'], {
      queryParams: {
        car: 'Bugatti Bolide'
      }
    });
  }
}