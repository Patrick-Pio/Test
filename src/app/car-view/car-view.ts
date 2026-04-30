import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Car3dViewerComponent } from '../car3d-viewer/car3d-viewer';

@Component({
  selector: 'app-car-view',
  standalone: true,
  imports: [CommonModule, RouterModule, Car3dViewerComponent],
  templateUrl: './car-view.html',
  styleUrls: ['./car-view.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarViewComponent {

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
        car: 'Ferrari 288 GTO'
      }
    });
  }
}